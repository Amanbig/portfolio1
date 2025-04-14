"use client";

import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import axios from 'axios';

function Stats() {
    const [stats, setStats] = useState([
        { num: 0, text: "Projects Completed", loading: true },
        { num: 0, text: "Technologies Mastered", loading: true },
        { num: 0, text: "Code Commits", loading: true },
        { num: 0, text: "Pull Requests", loading: true },
        { num: 0, text: "Stars Received", loading: true },
        { num: 0, text: "Lines of Code", loading: true, suffix: "k" },
    ]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Expanded list of technologies
    const technologies = [
        'JavaScript', 'React', 'Next.js', 'Node.js', 'TypeScript',
        'Python', 'Tailwind CSS', 'Git', 'HTML', 'CSS', 'MongoDB',
        'Express.js', 'SQL', 'GraphQL', 'Docker', 'AWS', 'Jest'
    ];

    useEffect(() => {
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
                setError('Failed to fetch latest stats. Showing cached or fallback values.');
                setStats(prev => prev.map(stat => ({ ...stat, loading: false })));
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
            setStats([
                { num: data.repoCount, text: "Projects Completed", loading: false },
                { num: technologies.length, text: "Technologies Mastered", loading: false },
                { num: data.commitCount, text: "Code Commits", loading: false },
                { num: data.pullCount, text: "Pull Requests", loading: false },
                { num: data.starCount, text: "Stars Received", loading: false },
                { num: data.linesOfCode, text: "Lines of Code", loading: false, suffix: "k" },
            ]);
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
                            className="flex flex-col items-center p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm hover:bg-gray-800/70 transition-colors"
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