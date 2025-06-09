"use client";

import React from 'react';
import Layout from '../../components/layout/Layout';
import Header from '../../components/layout/Header';

export default function HomePage() {
  return (
    <Layout>
      <Header />
      
      {/* Additional sections can be added here */}
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Blue Horizon
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Exploring the frontiers of aerospace engineering through collegiate rocketry
          </p>
        </div>
      </section>
    </Layout>
  );
}