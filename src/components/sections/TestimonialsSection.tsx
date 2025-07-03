
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { GlareCard } from "@/components/ui/glare-card";

const TestimonialsSection = () => {
  const testimonials = [{
    quote: "Rahul's creativity and attention to detail transformed our brand video beyond expectations. The visual effects were absolutely stunning.",
    name: "Sarah Johnson",
    designation: "Tech Startup CEO",
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&h=500&fit=crop&crop=face"
  }, {
    quote: "Incredible work on our music video. The editing style perfectly matched our vision and the final result exceeded all expectations.",
    name: "Mike Chen",
    designation: "Music Producer",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face"
  }, {
    quote: "Professional, timely, and exceptionally talented. Rahul's documentary work tells stories that truly resonate with audiences.",
    name: "Emily Davis",
    designation: "Marketing Director",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&crop=face"
  }, {
    quote: "The AI-enhanced motion graphics were mind-blowing. Rahul brings cutting-edge technology to traditional video editing.",
    name: "Alex Rodriguez",
    designation: "Creative Director",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&crop=face"
  }, {
    quote: "Outstanding cinematography and post-production work. Every frame tells a story and captures emotion perfectly.",
    name: "Lisa Thompson",
    designation: "Film Producer",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop&crop=face"
  }];

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hear from satisfied clients who've experienced the magic of professional video editing
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <GlareCard className="p-6 h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.src}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-white">{testimonial.name}</h4>
                          <p className="text-sm text-gray-400">{testimonial.designation}</p>
                        </div>
                      </div>
                      <blockquote className="text-gray-300 italic flex-grow">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>
                  </GlareCard>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white border-white/30 hover:bg-white/10" />
          <CarouselNext className="text-white border-white/30 hover:bg-white/10" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
