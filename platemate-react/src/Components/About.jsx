import React from 'react';

export default function AboutPage() {
  return (
    <section className="bg-conifer-900 text-white py-16 flex flex-col">
      <div className="container mx-auto text-center">
        <h2 className="text-xl lg:text-xl xl:text-3xl 2xl:text-6xl font-bold mb-4">About Plate Mate</h2>
        <div className="flex flex-col lg:flex-row items-center text-left">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <img src="PlateMate.png" alt="Plate Mate Logo" className="mx-auto" />
          </div>
          <div className="w-full lg:w-1/2 lg:ml-12">
            <p className="text-lg lg:text-2xl mb-4">Plate Mate is a social meal planning platform designed to help you and your friends or coworkers organize and share meal prep ideas.</p>
            <p className="text-lg lg:text-2xl mb-4">With Plate Mate, you can:</p>
            <ul className="list-disc pl-8">
              <li className="mb-2 text-xl">Connect with friends and coworkers to share your favorite recipes</li>
              <li className="mb-2 text-xl">Plan and schedule meals together for the week</li>
              <li className="mb-2 text-xl">Discover new recipes and meal prep tips from others</li>
              <li className="mb-2 text-xl">Track your progress and stay motivated on your health journey</li>
            </ul>
            <p className="text-lg lg:text-2xl">Join Plate Mate today and start enjoying healthier, more enjoyable meals with your community!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
