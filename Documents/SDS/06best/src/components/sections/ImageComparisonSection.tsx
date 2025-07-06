import { motion } from "framer-motion";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";
import { ArrowLeft, ArrowRight, TrendingUp, Zap, Users } from "lucide-react";
import {
  fadeInUpVariants,
  staggerContainerVariants,
} from "../../hooks/use-scroll-reveal";

export default function ImageComparisonSection() {
  const comparisons = [
    {
      title: "E-commerce Store Transformation",
      description: "From cluttered mess to conversion machine",
      beforeImage:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&sat=-100&bri=-50",
      afterImage:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      metrics: [
        { icon: TrendingUp, label: "Conversion Rate", value: "+340%" },
        { icon: Zap, label: "Load Time", value: "-75%" },
        { icon: Users, label: "User Engagement", value: "+250%" },
      ],
    },
    {
      title: "SaaS Platform Redesign",
      description: "From complex to intuitive user experience",
      beforeImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&sat=-100&bri=-50",
      afterImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      metrics: [
        { icon: Users, label: "User Retention", value: "+180%" },
        { icon: TrendingUp, label: "Feature Adoption", value: "+220%" },
        { icon: Zap, label: "Task Completion", value: "+95%" },
      ],
    },
    {
      title: "Mobile App Interface",
      description: "From outdated to cutting-edge design",
      beforeImage:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&sat=-100&bri=-50",
      afterImage:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      metrics: [
        { icon: Users, label: "App Store Rating", value: "+45%" },
        { icon: TrendingUp, label: "Daily Active Users", value: "+160%" },
        { icon: Zap, label: "Session Duration", value: "+120%" },
      ],
    },
  ];

  return (
    <section className="py-24 px-8 bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal/10 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,177,126,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainerVariants}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUpVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            See the <span className="text-beige">Transformation</span>
          </motion.h2>
          <motion.p
            variants={fadeInUpVariants}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto"
          >
            Drag the slider to reveal the dramatic before and after results of
            our work. These aren't just redesigns – they're complete digital
            transformations.
          </motion.p>
        </motion.div>

        {/* Image Comparisons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={fadeInUpVariants}
              viewport={{ once: true }}
              className="group"
            >
              {/* Image Comparison */}
              <div className="relative mb-6">
                <ImageComparison className="w-full h-80 rounded-2xl overflow-hidden border border-gray-800 group-hover:border-beige/30 transition-colors duration-300">
                  <ImageComparisonImage
                    src={comparison.beforeImage}
                    alt={`${comparison.title} - Before`}
                    side="before"
                  />
                  <ImageComparisonImage
                    src={comparison.afterImage}
                    alt={`${comparison.title} - After`}
                    side="after"
                  />
                  <ImageComparisonSlider />
                </ImageComparison>

                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-white">
                  Before
                </div>
                <div className="absolute top-4 right-4 bg-beige/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-black">
                  After
                </div>

                {/* Instruction */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-gray-300 flex items-center gap-2"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Drag to reveal transformation</span>
                  <ArrowRight className="w-3 h-3" />
                </motion.div>
              </div>

              {/* Content */}
              <motion.div variants={fadeInUpVariants} className="space-y-4">
                <motion.h3
                  variants={fadeInUpVariants}
                  className="text-xl font-bold text-white group-hover:text-beige transition-colors duration-300"
                >
                  {comparison.title}
                </motion.h3>
                <motion.p variants={fadeInUpVariants} className="text-gray-400">
                  {comparison.description}
                </motion.p>

                {/* Metrics */}
                <motion.div
                  variants={staggerContainerVariants}
                  className="grid grid-cols-3 gap-4 pt-4"
                >
                  {comparison.metrics.map((metric, metricIndex) => {
                    const IconComponent = metric.icon;
                    return (
                      <motion.div
                        key={metricIndex}
                        variants={fadeInUpVariants}
                        className="text-center p-3 bg-charcoal/30 rounded-lg border border-gray-800 hover:border-beige/30 transition-colors duration-300"
                      >
                        <IconComponent className="w-5 h-5 text-beige mx-auto mb-2" />
                        <div className="text-xs text-gray-400 mb-1">
                          {metric.label}
                        </div>
                        <div className="text-xs font-medium text-gray-300">
                          Improvement
                        </div>
                        <div className="text-lg font-bold text-beige">
                          {metric.value}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
