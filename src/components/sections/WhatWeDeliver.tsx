import React from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { WHAT_WE_DELIVER } from '../../data/content';
import * as Icons from 'lucide-react';
import { Card } from '../ui/Card';

export const WhatWeDeliver = () => {
  return (
    <section id="services" className="relative py-24 lg:py-40 bg-brand-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionLabel center className="mb-6">What We Deliver</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-dm font-bold text-brand-indigo leading-tight tracking-tight mb-6">
            Everything you need to <br className="hidden sm:block" /> build modern learning.
          </h2>
          <p className="text-lg text-gray-600 font-normal leading-relaxed">
            From initial structure to final video edits, our team of expert educators delivers end-to-end academic content creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHAT_WE_DELIVER.map((service) => {
            const IconComponent = Icons[service.iconName as keyof typeof Icons] as React.ElementType;
            return (
              <div key={service.id} className="group h-full">
                <Card className="h-full flex flex-col items-start transition-transform hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-xl bg-brand-coral/10 text-brand-coral flex items-center justify-center mb-8 transition-colors duration-200 group-hover:bg-brand-coral group-hover:text-white">
                    {IconComponent && <IconComponent className="w-6 h-6" strokeWidth={1.5} />}
                  </div>
                  <h3 className="text-xl font-dm font-semibold text-brand-indigo mb-3 group-hover:text-brand-coral transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-normal mt-auto">
                    {service.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
