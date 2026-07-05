
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, Shield, BarChart3, Globe, Sparkles, ArrowRight, 
  CheckCircle, Star, Play, Users, TrendingUp, Cpu
} from 'lucide-react';
import Layout from '../components/Layout';

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'AI-Powered Content',
    description: 'Generate SEO-optimized blog posts, social media content, and email campaigns with GPT-4 and Gemini Pro.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast',
    description: 'Get results in seconds with our optimized AI infrastructure and intelligent caching system.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Enterprise Security',
    description: 'Your data is encrypted at rest and in transit. SOC 2 compliant infrastructure.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Analytics Dashboard',
    description: 'Track your content performance, token usage, and ROI with comprehensive analytics.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Multi-Language',
    description: 'Generate content in 50+ languages with native-quality output.',
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'Smart Templates',
    description: 'Pre-built templates for every use case - from blog posts to product descriptions.',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow Inc.',
    content: 'This platform has cut our content production time by 70%. The AI quality is indistinguishable from human writers.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'CEO',
    company: 'GrowthLabs',
    content: 'We scaled our content marketing from 5 posts per week to 50. Game changer for our agency.',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Content Strategist',
    company: 'MediaMax',
    content: 'The email marketing templates alone have increased our conversion rates by 35%.',
    rating: 5,
  },
];

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '2M+', label: 'Contents Generated' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9/5', label: 'User Rating' },
];

export default function Landing() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-hero-pattern opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-[128px] animate-pulse-slow delay-1000" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Sparkles className="w-4 h-4 text-accent-cyan" />
              <span className="text-sm">Powered by GPT-4 & Gemini Pro</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">AI-Powered</span>
              <br />
              Enterprise Automation
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Create stunning content, analyze data, and automate your business 
              workflows with the most advanced AI platform. Start free today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary inline-flex items-center gap-2 text-lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/demo" className="btn-secondary inline-flex items-center gap-2 text-lg">
                <Play className="w-5 h-5" />
                Watch Demo
              </Link>
            </div>
            
            <div className="mt-16 flex items-center justify-center gap-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>10 free tokens</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 glass p-4 animate-float hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Conversion Rate</p>
              <p className="font-semibold">+127%</p>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-32 right-10 glass p-4 animate-float delay-500 hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent-cyan/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent-cyan" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Active Users</p>
              <p className="font-semibold">12,458</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass p-8 rounded-3xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <p className="text-4xl font-bold text-gradient mb-2">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to <span className="text-gradient">Scale</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed for teams and enterprises looking to 
              automate their content workflows.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-hover p-6 group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-primary/20 flex items-center justify-center mb-4 
                              text-accent-primary group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready-to-Use <span className="text-gradient">Templates</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Stop starting from scratch. Choose from our library of proven templates 
                and generate professional content in seconds.
              </p>
              
              <div className="space-y-4">
                {[
                  { name: 'SEO Blog Post', category: 'Content', pro: false },
                  { name: 'Social Media Campaign', category: 'Marketing', pro: false },
                  { name: 'Email Sequence', category: 'Marketing', pro: false },
                  { name: 'Product Description', category: 'E-commerce', pro: true },
                  { name: 'Video Script', category: 'Video', pro: true },
                  { name: 'Data Analysis Report', category: 'Analytics', pro: true },
                ].map((template, i) => (
                  <div key={i} className="flex items-center justify-between p-4 glass rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-dark-600 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-accent-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-gray-500">{template.category}</p>
                      </div>
                    </div>
                    {template.pro && (
                      <span className="px-3 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full font-medium">
                        PRO
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass p-6 rounded-3xl glow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-accent-primary" />
                    </div>
                    <div className="flex-1 p-4 bg-dark-700 rounded-xl rounded-tl-none">
                      <p className="text-sm text-gray-300">
                        Generate a SEO-optimized blog post about artificial intelligence trends in 2024...
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 p-4 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-xl rounded-tr-none">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-300">
                          <strong>Title:</strong> The Future of AI: 10 Trends Reshaping Business in 2024
                        </p>
                        <p className="text-sm text-gray-400">
                          As we navigate through 2024, artificial intelligence continues to...
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-4 h-4 text-accent-cyan" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-dark-600">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Tokens used: <strong className="text-white">485</strong></span>
                    <span>Time: <strong className="text-white">2.3s</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by <span className="text-gradient">Thousands</span>
            </h2>
            <p className="text-xl text-gray-400">
              See what our customers are saying about their experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center font-semibold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 md:p-16 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="text-gradient">Transform</span> Your Content?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join 50,000+ businesses already using AI to scale their content production.
                Start your free trial today - no credit card required.
              </p>
              <Link to="/register" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AI SaaS</span>
            </div>
            
            <div className="flex items-center gap-8 text-gray-400 text-sm">
              <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link to="#" className="hover:text-white transition-colors">Documentation</Link>
              <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            </div>
            
            <p className="text-gray-500 text-sm">
              © 2024 AI SaaS Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
