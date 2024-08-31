/* eslint-disable react/no-unknown-property */
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import Section1 from "@/components/Section1";
import Footer from "@/components/Footer";

const Landing = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, 5000, {
      duration: 4
    });
  }, []);
  
  return (
    <main className="parent-section-scroll flex flex-col gap-10 sm:gap-20 font-thin">
      <section className="custom-section-sroll text-center min-h-0 sm:min-h-screen flex flex-col justify-center items-center">
        {/* Hero Section  */}
        <div>
          <h1
            className="gradient-title text-4xl sm:text-5xl lg:text-8xl 
          font-extrabold tracking-tighter py-4 sm:py-6"
          >
            Find Your Dream Job 
            <span className="hidden lg:block">
              {" "}
              {/* Hidden on small screens, block on large screens */}
              and get Hired
            </span>
            <span className="lg:hidden">
              {" "}
              {/* Visible on small screens, hidden on large screens */}
              and get Hired
            </span>
          </h1>
          
          <div className='text-gray-500 sm:py-4 text-base sm:text-xl flex justify-center gap-2'>
            <div>
              Discover a Variety of
            </div> 
            <div className="flex justify-center">
              <div className="font-semibold bg-gradient-to-r from-[#4338ca] to-purple-500 bg-clip-text text-transparent">
                <motion.h1>{rounded}</motion.h1>
              </div>
              <div>
               + Jobs
              </div>
            </div>
        
          </div>
{/* 
          <p className="text-gray-500 sm:py-4 text-sm sm:text-xl">
            Explore thousands of job listings or find the perfect candidate.
          </p> */}
        </div>

        {/* Buttons  */}
        <div className="flex gap-6 justify-center py-8">
          <Link to="/jobs">
            <Button
              variant="blue"
              className="w-[160px] sm:w-[210px] bg-gradient-to-r from-[#4338ca] to-purple-500"
              size="xl"
            >
              Find Jobs
            </Button>
          </Link>
          <Link to="/post-job">
            <Button
              variant="outline"
              className="w-[160px] sm:w-[210px] bg-[#020817] border-2 border-slate-400"
              size="xl"
            >
              Post a job
            </Button>
          </Link>
        </div>
      </section>

      <Section1 />

      <section className="custom-section-sroll text-center min-h-0 sm:min-h-screen flex flex-col justify-center items-center gradient-title">
        <h1
          className="text-4xl sm:text-5xl lg:text-8xl 
            font-extrabold tracking-tighter py-4 sm:py-6"
        >
          Top companies hiring now
        </h1>
        {/* carousal */}
        <div className="backdrop-blur-lg p-6 my-6">
          <Carousel
            plugins={[Autoplay({ delay: 2000 })]}
            className="w-full py-3"
          >
            <CarouselContent className="flex gap-5 sm:gap-20 items-center">
              {companies.map(({ name, path, id }) => {
                return (
                  <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                    <img
                      src={path}
                      alt={name}
                      className="h-9 sm:h-14 object-contain"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 ">
          {/* Card-1  */}
          <Link to="/jobs">
            <div className="group cursor-pointer">
              <div className="flex flex-col justify-center items-center border-2 group-hover:border-purple-500 rounded-md backdrop-blur-md text-white p-8">
                <div className="font-semibold text-xl py-6 group-hover:text-purple-500">
                  For Job Seekers
                </div>
                <div className="text-center text-gray-500">
                  "Discover a Variety of 5000+ Jobs", PassionTrack is your
                  gateway to a fulfilling career. Whether you're starting out or
                  looking to advance, explore tailored job listings and get
                  personalized recommendations. Create your profile and connect
                  with top employers today.
                </div>
                <div className="flex justify-center items-center w-full mt-4 py-1 rounded-sm border-2 font-semibold group-hover:bg-purple-500">
                  <div>Explore</div>
                  <div className="flex self-end w-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-arrow-right arrow-icon h-5 w-6 stroke-2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Card-2  */}
          <Link to="/post-job">
            <div className="group cursor-pointer">
              <div className="flex flex-col justify-center items-center border-2 group-hover:border-purple-500 rounded-md backdrop-blur-md text-white p-8">
                <div className="font-semibold text-xl py-6 group-hover:text-purple-500">
                  For Employers
                </div>
                <div className="text-center text-gray-500">
                  Find and recruit the best candidates for your company on
                  PassionTrack. Post jobs and manage applications easily.
                  PassionTrack connects you with qualified candidates across
                  industries. Post jobs, manage applications, and streamline
                  your hiring process. Join today and find the talent that fits
                  your company’s needs.
                </div>
                <div className="flex justify-center items-center w-full mt-4 py-1 rounded-sm border-2 font-semibold group-hover:bg-purple-500">
                  <div>Explore</div>
                  <div className="flex self-end w-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-arrow-right arrow-icon h-5 w-6 stroke-2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="custom-section-sroll min-h-0 sm:min-h-screen">
        <h1
          className="text-4xl sm:text-5xl lg:text-8xl 
            font-extrabold tracking-tighter sm:mt-10 py-4 sm:py-6 gradient-title text-center"
        >
          About Us
        </h1>
        {/* accordion */}
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      <Footer/>
      </section>
    </main>
  );
};

export default Landing;
