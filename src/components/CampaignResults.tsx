import { FileText, Image, Mail, MessageSquare, Video, Megaphone, Download, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface CampaignResultsProps {
  url: string;
  industry: string;
  onRetry: () => void;
}

export function CampaignResults({ url, industry, onRetry }: CampaignResultsProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const results = [
    {
      icon: FileText,
      title: 'Strategic Brief',
      description: 'Comprehensive marketing strategy and campaign overview',
      preview: 'Brand positioning, target audience analysis, key messaging pillars...',
      color: 'blue',
      badge: 'PDF',
      content: `# Marketing Strategy Brief

## Executive Summary
This comprehensive marketing strategy is designed to position your brand as a leader in the ${industry} industry. Our approach focuses on authentic storytelling, data-driven targeting, and multi-channel engagement.

## Brand Positioning
Your brand represents innovation and excellence in ${industry}. We've identified key differentiators that set you apart from competitors and developed messaging that resonates with your target audience.

## Target Audience Analysis
- **Primary Demographic**: Professionals aged 25-45 in ${industry}
- **Pain Points**: Looking for reliable, innovative solutions
- **Behavioral Patterns**: Active on social media, research-driven decisions
- **Key Motivators**: Quality, trust, and value

## Key Messaging Pillars
1. **Innovation**: Leading the way with cutting-edge solutions
2. **Trust**: Proven track record of excellence
3. **Value**: Superior ROI for clients
4. **Support**: Dedicated customer success team

## Campaign Objectives
- Increase brand awareness by 40%
- Generate 500+ qualified leads
- Achieve 15% conversion rate
- Build engaged social media community

## Success Metrics
- Website traffic growth
- Social media engagement rates
- Lead generation numbers
- Conversion rates
- Customer acquisition cost`,
    },
    {
      icon: MessageSquare,
      title: 'Social Media Posts',
      description: '15 ready-to-publish posts across platforms',
      preview: 'Instagram, Facebook, Twitter, LinkedIn content with hashtags...',
      color: 'purple',
      badge: '15 Posts',
      content: `# Social Media Content Calendar

## Post 1 - Introduction (All Platforms)
Excited to share what we've been working on! 🚀 Transforming the way ${industry} professionals approach their work. Stay tuned for amazing updates! #Innovation #${industry.replace(' ', '')}

## Post 2 - Value Proposition (LinkedIn)
In today's fast-paced ${industry} landscape, efficiency matters. Our solution helps teams save 10+ hours per week while improving outcomes. Learn how: [Link] #Productivity #BusinessGrowth

## Post 3 - Behind the Scenes (Instagram)
Meet the team making it all happen! 👋 Swipe to see the passion and dedication behind every feature. #TeamTuesday #CompanyCulture

## Post 4 - Customer Success Story (Facebook)
"This changed everything for our team!" - hear why clients in ${industry} trust us to deliver results. Watch their story: [Link] #CustomerSuccess #Testimonial

## Post 5 - Educational Content (Twitter)
🔥 Quick tip: The secret to success in ${industry}? Focus on these 3 things:
1. Consistency
2. Innovation
3. Customer feedback
What would you add? 💬

[13 more posts with platform-specific optimizations, hashtags, and engagement hooks...]`,
    },
    {
      icon: Mail,
      title: 'Email Sequence',
      description: '5-part email campaign with subject lines',
      preview: 'Welcome email, value proposition, social proof, offer, follow-up...',
      color: 'green',
      badge: '5 Emails',
      content: `# Email Campaign Sequence

## Email 1: Welcome
**Subject**: Welcome! Here's what you need to know about [Company]
**Preview**: You're going to love what we have planned...

Hi [First Name],

Welcome to our community! We're thrilled to have you here.

Over the next few days, you'll discover how [Company] is transforming ${industry}. But first, here's what you can expect:
- Exclusive insights and tips
- Early access to new features
- Special offers just for you

Ready to get started? [CTA Button]

---

## Email 2: Value Proposition (Day 3)
**Subject**: The #1 problem facing ${industry} (and how we solve it)
**Preview**: This could change everything...

[Content continues with problem-solution framework]

---

## Email 3: Social Proof (Day 5)
**Subject**: How [Company Name] achieved 300% growth using our platform
**Preview**: Their story might inspire you...

[Customer success story and testimonials]

---

## Email 4: Special Offer (Day 7)
**Subject**: [First Name], this exclusive offer expires in 48 hours
**Preview**: Don't miss out on this limited opportunity...

[Time-sensitive offer with clear value proposition]

---

## Email 5: Last Chance (Day 9)
**Subject**: Final reminder: Your exclusive offer expires tonight
**Preview**: Last chance to claim your spot...

[Final push with urgency and FOMO]`,
    },
    {
      icon: FileText,
      title: 'Blog Article',
      description: 'SEO-optimized long-form content',
      preview: '2,000+ word article with meta description and keywords...',
      color: 'orange',
      badge: '2,000 words',
      content: `# The Ultimate Guide to Success in ${industry}: 2024 Edition

**Meta Description**: Discover proven strategies and expert insights for achieving success in ${industry}. Learn from industry leaders and transform your approach today.

**Target Keywords**: ${industry} guide, ${industry} strategies, ${industry} best practices

## Introduction

The ${industry} landscape is evolving faster than ever. In this comprehensive guide, we'll explore the strategies, tools, and mindsets that separate leaders from followers in today's competitive environment.

## Chapter 1: Understanding the Modern ${industry} Landscape

The past few years have fundamentally changed how ${industry} operates. Digital transformation, changing customer expectations, and emerging technologies have created both challenges and unprecedented opportunities...

[Content continues with comprehensive coverage of the topic, including statistics, case studies, actionable tips, and expert insights across 2,000+ words]

## Key Takeaways

1. Success in ${industry} requires both innovation and consistency
2. Customer-centric approaches always win
3. Data-driven decision making is non-negotiable
4. Continuous learning and adaptation are essential

## Conclusion

The future of ${industry} belongs to those who embrace change while staying true to core values. By implementing the strategies outlined in this guide, you'll be well-positioned to thrive in this dynamic landscape.

Ready to take the next step? [CTA]`,
    },
    {
      icon: Megaphone,
      title: 'Ad Copy',
      description: 'Multiple ad variations for different platforms',
      preview: 'Google Ads, Facebook Ads, LinkedIn Ads with CTAs...',
      color: 'red',
      badge: '12 Variations',
      content: `# Multi-Platform Ad Copy

## Google Search Ads

### Ad Set 1 - Problem-Focused
**Headline 1**: Struggling with ${industry}? We Can Help
**Headline 2**: Trusted by 10,000+ Professionals
**Headline 3**: Get Started in Minutes
**Description**: Transform your ${industry} workflow with our proven solution. Free trial available. No credit card required.

### Ad Set 2 - Benefit-Focused
**Headline 1**: Save 10+ Hours Per Week
**Headline 2**: ${industry} Made Simple
**Headline 3**: Join Leading Companies
**Description**: See why ${industry} leaders choose us. Powerful features, simple interface, dedicated support.

## Facebook/Instagram Ads

### Ad 1 - Video Ad (30 sec)
**Primary Text**: Is ${industry} taking too much of your time? There's a better way. 💡
**Headline**: Try [Company] Free for 14 Days
**Description**: No credit card required

### Ad 2 - Carousel Ad
**Primary Text**: 5 ways [Company] transforms ${industry}
**Card 1**: Automate repetitive tasks
**Card 2**: Collaborate seamlessly
**Card 3**: Track performance in real-time
**Card 4**: Integrate with your tools
**Card 5**: Scale with confidence

## LinkedIn Ads

### Sponsored Content 1
**Headline**: The Future of ${industry} is Here
**Description**: Join 10,000+ professionals who've already made the switch. Discover why teams in ${industry} trust [Company] to deliver results.
**CTA**: Learn More

[8 more ad variations optimized for different platforms and objectives...]`,
    },
    {
      icon: Video,
      title: 'Video Scripts',
      description: 'Scripts for promotional videos',
      preview: '30-second pitch, 60-second explainer, testimonial prompts...',
      color: 'indigo',
      badge: '3 Scripts',
      content: `# Video Scripts Collection

## Script 1: 30-Second Elevator Pitch

**[VISUAL: Modern office/workspace]**
**VO**: "Every day, professionals in ${industry} waste hours on tasks that could be automated."

**[VISUAL: Product interface, smooth animations]**
**VO**: "That's why we built [Company]. The smart solution that helps you work faster, smarter, and better."

**[VISUAL: Happy customers, results dashboard]**
**VO**: "Join 10,000+ ${industry} professionals who've already made the switch."

**[VISUAL: Logo and CTA]**
**VO**: "Try [Company] free for 14 days. No credit card required."

---

## Script 2: 60-Second Explainer Video

**[OPENING SHOT: Person looking frustrated at computer]**
**VO**: "Sound familiar? You're drowning in ${industry} tasks, deadlines are looming, and you're working late...again."

**[TRANSITION: Smooth animation to product]**
**VO**: "Meet [Company]. We've reimagined how ${industry} works."

**[FEATURE SHOWCASE: 3 quick demos]**
**VO**: "Automate repetitive work. Collaborate seamlessly. Track everything in real-time."

**[SOCIAL PROOF: Customer testimonials]**
**VO**: "Don't just take our word for it..."

**[CLOSING: Strong CTA]**
**VO**: "Ready to transform your workflow? Start your free trial today."

---

## Script 3: Customer Testimonial Prompts

**Questions for Customers:**
1. What was your biggest challenge before using [Company]?
2. How has [Company] changed your daily workflow?
3. What results have you seen since implementing our solution?
4. What would you tell others in ${industry} considering [Company]?
5. If you could describe [Company] in three words, what would they be?

**B-Roll Suggestions:**
- Customer using product in natural environment
- Team collaboration scenes
- Dashboard showing results/metrics
- Before/after comparisons`,
    },
    {
      icon: Image,
      title: 'Generated Images',
      description: 'AI-generated visuals for your campaign',
      preview: 'Hero images, social media graphics, ad creatives...',
      color: 'pink',
      badge: '8 Images',
      isImageGallery: true,
      images: [
        {
          title: 'Hero Image - Website Header',
          dimensions: '1920x1080px',
          format: 'PNG',
          style: 'Modern, professional, brand-aligned',
          useCase: 'Website homepage, landing pages',
          url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920',
        },
        {
          title: 'Social Media - Instagram Post',
          dimensions: '1080x1080px',
          format: 'JPG',
          style: 'Engaging, colorful, mobile-optimized',
          useCase: 'Instagram feed, Facebook posts',
          url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1080',
        },
        {
          title: 'Social Media - Instagram Story',
          dimensions: '1080x1920px',
          format: 'JPG',
          style: 'Vertical format, attention-grabbing',
          useCase: 'Instagram Stories, Facebook Stories',
          url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1080',
        },
        {
          title: 'Facebook Ad Creative',
          dimensions: '1200x628px',
          format: 'JPG',
          style: 'Professional with clear CTA space',
          useCase: 'Facebook ads, LinkedIn ads',
          url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1200',
        },
        {
          title: 'Blog Feature Image',
          dimensions: '1200x675px',
          format: 'JPG',
          style: 'Editorial, informative',
          useCase: 'Blog posts, articles',
          url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
        },
        {
          title: 'Email Header',
          dimensions: '600x200px',
          format: 'JPG',
          style: 'Clean, professional, email-safe',
          useCase: 'Email campaigns',
          url: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        {
          title: 'Google Display Ad',
          dimensions: '728x90px',
          format: 'JPG',
          style: 'Compact, clear messaging',
          useCase: 'Google Display Network',
          url: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=728',
        },
        {
          title: 'Pinterest Pin',
          dimensions: '1000x1500px',
          format: 'JPG',
          style: 'Vertical, visually striking',
          useCase: 'Pinterest marketing',
          url: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1000',
        },
      ],
      content: '',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    pink: 'bg-pink-100 text-pink-700 border-pink-200',
  };

  const iconColorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500',
  };

  const selectedResult = results[selectedTab];
  const Icon = selectedResult.icon;
  const colorClass = colorClasses[selectedResult.color as keyof typeof colorClasses];
  const iconColorClass = iconColorClasses[selectedResult.color as keyof typeof iconColorClasses];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Campaign Ready!</h1>
            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
              <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">{url}</span>
              <span>•</span>
              <span className="capitalize">{industry}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-gray-300 hover:bg-gray-50 transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Create New Campaign
        </button>
      </div>

      <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Next Steps</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Review all generated content and customize as needed</li>
              <li>• Download your campaign files and share with your team</li>
              <li>• Schedule posts and launch your campaigns</li>
              <li>• Monitor performance and iterate based on results</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-6">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Deliverables</h3>
            </div>
            <div className="py-2">
              {results.map((result, index) => {
                const TabIcon = result.icon;
                const isActive = selectedTab === index;
                const tabColorClass = iconColorClasses[result.color as keyof typeof iconColorClasses];

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedTab(index)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                      isActive
                        ? 'bg-blue-50 border-l-4 border-blue-600'
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 ${tabColorClass} rounded-lg flex items-center justify-center`}>
                      <TabIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                        {result.title}
                      </p>
                      <p className="text-xs text-gray-500">{result.badge}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all hover:shadow-lg">
                <Download className="w-5 h-5" />
                Download All
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 ${iconColorClass} rounded-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{selectedResult.title}</h3>
                <p className="text-sm text-gray-600">{selectedResult.description}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}>
                {selectedResult.badge}
              </span>
            </div>
          </div>

          <div className="p-6 max-h-[600px] overflow-y-auto">
            {selectedResult.isImageGallery ? (
              <div className="grid grid-cols-1 gap-6">
                {selectedResult.images?.map((image, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                    <div className="aspect-video bg-gray-900 flex items-center justify-center overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{image.title}</h4>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded">
                          {image.format}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Dimensions</p>
                          <p className="font-medium text-gray-900">{image.dimensions}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Use Case</p>
                          <p className="font-medium text-gray-900">{image.useCase}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-gray-500 text-xs">Style</p>
                        <p className="text-sm text-gray-700">{image.style}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed">
                  {selectedResult.content}
                </pre>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {selectedTab + 1} of {results.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTab(Math.max(0, selectedTab - 1))}
                disabled={selectedTab === 0}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              <button
                onClick={() => setSelectedTab(Math.min(results.length - 1, selectedTab + 1))}
                disabled={selectedTab === results.length - 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
