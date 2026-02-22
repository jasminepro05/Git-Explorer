import { motion } from 'motion/react';
import { Search, Zap, Layout, Shield } from 'lucide-react';

const features = [
  {
    icon: <Search className="text-indigo-400" size={32} />,
    title: "Deep Search",
    description: "Instantly find any user on GitHub and get a comprehensive breakdown of their profile and activity."
  },
  {
    icon: <Zap className="text-purple-400" size={32} />,
    title: "Lightning Fast",
    description: "Optimized data fetching ensures you get repository details and stats in the blink of an eye."
  },
  {
    icon: <Layout className="text-emerald-400" size={32} />,
    title: "Modern UI",
    description: "A beautiful glassmorphism interface designed for clarity, speed, and a premium user experience."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Why Choose GitExplorer?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            We've built the most intuitive way to navigate the world's largest 
            developer community.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="group p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:bg-white/10 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
