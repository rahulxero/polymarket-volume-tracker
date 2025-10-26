import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [traders, setTraders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utility Functions
  const formatAddress = (address) => {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatMoney = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Fetch Traders Function
  const fetchTopTraders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/leaderboard');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setTraders(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Sorting Functions
  const sortTraders = (sortBy) => {
    const sortedTraders = [...traders].sort((a, b) => {
      switch(sortBy) {
        case 'volume':
          return b.volume - a.volume;
        case 'profit':
          return b.profit - a.profit;
        case 'winRate':
          return b.win_rate - a.win_rate;
        default:
          return 0;
      }
    });
    setTraders(sortedTraders);
  };

  // Initial Data Load
  useEffect(() => {
    fetchTopTraders();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Head>
        <title>Polymarket Top Traders by Volume</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.tailwindcss.com" rel="stylesheet" />
      </Head>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Top Traders by Volume
            </h1>
          </div>

          {/* Sorting Controls */}
