"use client";

import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import axios from 'axios';


import { portfolioData } from "@/data/portfolio";

function Stats() {
    const [stats, setStats] = useState(portfolioData.stats.items.map(item => ({
        ...item,
        num: 0,
        loading: true
    })));
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Technologies definition from config
    const technologies = portfolioData.stats.technologies;

    useEffect(() => {
        // Check configuration first
        if (!portfolioData.stats.useGithub) {
            setStats(portfolioData.stats.items.map(item => ({
                ...item,
                num: item.value || 0,
                loading: false
            })));
            setIsLoading(false);
            return;
        }

        const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
        const GITHUB_USERNAME = 'Amanbig';
        const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // Optional: Add to .env.local

        const getCachedData = () => {
            const cached = localStorage.getItem('github_stats');
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    return data;
                }
            }
            return null;
        };

        const setCachedData = (data) => {
            localStorage.setItem('github_stats', JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        };

        const fetchGitHubStats = async () => {
            try {
                setIsLoading(true);
                const cachedData = getCachedData();
                if (cachedData) {
                    updateStats(cachedData);
                    setIsLoading(false);
                    return;
                }

                const headers = {
                    'Accept': 'application/vnd.github.v3+json',
                    ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
                };

                // Fetch repositories
                const reposResponse = await axios.get(
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
                    { headers }
                );

                // Calculate stats concurrently
                const [commitCount, pullCount, starCount] = await Promise.all([
                    calculateCommits(reposResponse.data, headers),
                    calculatePullRequests(GITHUB_USERNAME, headers),
                    calculateStars(reposResponse.data),
                ]);

                // Estimate lines of code (simplified heuristic)
                const linesOfCode = Math.round(commitCount * 100 / 1000); // ~100 lines per commit

                const newStats = {
                    repoCount: reposResponse.data.length,
                    commitCount,
                    pullCount,
                    starCount,
                    linesOfCode,
                };

                setCachedData(newStats);
                updateStats(newStats);
                setError(null);
            } catch (err) {
                console.error('Error fetching GitHub stats:', err);
                setError(null); // Silent fail to manual data
                // Fallback to manual data on error
                setStats(portfolioData.stats.items.map(item => ({
                    ...item,
                    num: item.value || 0,
                    loading: false
                })));
            } finally {
                setIsLoading(false);
            }
        };

        const calculateCommits = async (repos, headers) => {
            let totalCommits = 0;
            const commitPromises = repos.map(repo =>
                axios.get(
                    `${repo.commits_url.replace('{/sha}', '')}?per_page=100`,
                    { headers }
                ).catch(() => ({ data: [] }))
            );

            const responses = await Promise.all(commitPromises);
            responses.forEach(response => {
                totalCommits += response.data.length;
            });
            return totalCommits;
        };

        const calculatePullRequests = async (username, headers) => {
            const prResponse = await axios.get(
                `https://api.github.com/search/issues?q=author:${username}+type:pr`,
                { headers }
            );
            return prResponse.data.total_count || 0;
        };

        const calculateStars = (repos) => {
            return repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        };

        const updateStats = (data) => {
            const statsValues = {
                "Projects Completed": data.repoCount,
                "Technologies Mastered": technologies.length,
                "Code Commits": data.commitCount,
                "Pull Requests": data.pullCount,
                "Stars Received": data.starCount,
                "Lines of Code": data.linesOfCode
            };

            setStats(portfolioData.stats.items.map(item => ({
                ...item,
                num: statsValues[item.text] || 0,
                loading: false
            })));
        };

        fetchGitHubStats();
    }, []);

    return (
        <section className="pt-8 pb-12 xl:pt-0 xl:pb-0">
            <div className="container mx-auto px-4">
                {error && (
                    <div className="text-red-400 text-center mb-6 p-3 bg-red-900/20 rounded-lg">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center p-6 rounded-xl transition-all duration-300 glass hover-glow ${item.loading ? 'opacity-50' : 'opacity-100'}`}
                        >
                            {item.loading || isLoading ? (
                                <div className="animate-pulse bg-gray-600 h-12 w-24 rounded mb-2"></div>
                            ) : (
                                <CountUp
                                    end={item.num}
                                    duration={3}
                                    delay={0.5}
                                    separator=","
                                    suffix={item.suffix || ""}
                                    className="text-4xl xl:text-5xl font-extrabold text-accent"
                                />
                            )}
                            <p className="text-center text-white/80 mt-2 text-sm xl:text-base max-w-[150px]">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Stats;