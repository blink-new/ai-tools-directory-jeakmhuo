import { useState, useMemo } from 'react'
import { Search, Star, ExternalLink, Filter, Sparkles, Brain, Zap, Image, MessageSquare, Code, Music, Video, FileText, Palette, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'

interface AITool {
  id: string
  name: string
  description: string
  category: string
  pricing: 'Free' | 'Freemium' | 'Paid'
  rating: number
  url: string
  featured: boolean
  tags: string[]
  icon: string
}

const aiTools: AITool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced conversational AI that can help with writing, coding, analysis, and creative tasks.',
    category: 'Conversational AI',
    pricing: 'Freemium',
    rating: 4.8,
    url: 'https://chat.openai.com',
    featured: true,
    tags: ['writing', 'coding', 'analysis'],
    icon: 'MessageSquare'
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'Create stunning AI-generated artwork and images from text descriptions.',
    category: 'Image Generation',
    pricing: 'Paid',
    rating: 4.9,
    url: 'https://midjourney.com',
    featured: true,
    tags: ['art', 'design', 'creative'],
    icon: 'Image'
  },
  {
    id: '3',
    name: 'GitHub Copilot',
    description: 'AI-powered code completion and programming assistant for developers.',
    category: 'Code Assistant',
    pricing: 'Paid',
    rating: 4.7,
    url: 'https://github.com/features/copilot',
    featured: true,
    tags: ['coding', 'development', 'productivity'],
    icon: 'Code'
  },
  {
    id: '4',
    name: 'Jasper AI',
    description: 'AI writing assistant for marketing copy, blog posts, and content creation.',
    category: 'Writing Assistant',
    pricing: 'Paid',
    rating: 4.6,
    url: 'https://jasper.ai',
    featured: false,
    tags: ['writing', 'marketing', 'content'],
    icon: 'FileText'
  },
  {
    id: '5',
    name: 'DALL-E 3',
    description: 'Generate high-quality images from text prompts with OpenAI\'s latest model.',
    category: 'Image Generation',
    pricing: 'Paid',
    rating: 4.8,
    url: 'https://openai.com/dall-e-3',
    featured: true,
    tags: ['art', 'design', 'creative'],
    icon: 'Palette'
  },
  {
    id: '6',
    name: 'Claude',
    description: 'Anthropic\'s AI assistant for analysis, writing, math, coding, and creative tasks.',
    category: 'Conversational AI',
    pricing: 'Freemium',
    rating: 4.7,
    url: 'https://claude.ai',
    featured: true,
    tags: ['analysis', 'writing', 'coding'],
    icon: 'Brain'
  },
  {
    id: '7',
    name: 'Runway ML',
    description: 'AI-powered video editing and generation tools for creators.',
    category: 'Video Generation',
    pricing: 'Freemium',
    rating: 4.5,
    url: 'https://runwayml.com',
    featured: false,
    tags: ['video', 'editing', 'creative'],
    icon: 'Video'
  },
  {
    id: '8',
    name: 'Mubert',
    description: 'AI-generated music and soundtracks for content creators.',
    category: 'Audio Generation',
    pricing: 'Freemium',
    rating: 4.4,
    url: 'https://mubert.com',
    featured: false,
    tags: ['music', 'audio', 'creative'],
    icon: 'Music'
  },
  {
    id: '9',
    name: 'Perplexity AI',
    description: 'AI-powered search engine that provides accurate answers with sources.',
    category: 'Search & Research',
    pricing: 'Freemium',
    rating: 4.6,
    url: 'https://perplexity.ai',
    featured: true,
    tags: ['search', 'research', 'information'],
    icon: 'Globe'
  },
  {
    id: '10',
    name: 'Notion AI',
    description: 'AI writing assistant integrated into Notion for enhanced productivity.',
    category: 'Productivity',
    pricing: 'Paid',
    rating: 4.5,
    url: 'https://notion.so/ai',
    featured: false,
    tags: ['productivity', 'writing', 'organization'],
    icon: 'Zap'
  },
  {
    id: '11',
    name: 'Stable Diffusion',
    description: 'Open-source AI model for generating images from text descriptions.',
    category: 'Image Generation',
    pricing: 'Free',
    rating: 4.6,
    url: 'https://stability.ai',
    featured: false,
    tags: ['open-source', 'art', 'design'],
    icon: 'Sparkles'
  },
  {
    id: '12',
    name: 'Copy.ai',
    description: 'AI copywriting tool for marketing content, emails, and social media.',
    category: 'Writing Assistant',
    pricing: 'Freemium',
    rating: 4.3,
    url: 'https://copy.ai',
    featured: false,
    tags: ['copywriting', 'marketing', 'social media'],
    icon: 'FileText'
  }
]

const categories = ['All', 'Conversational AI', 'Image Generation', 'Code Assistant', 'Writing Assistant', 'Video Generation', 'Audio Generation', 'Search & Research', 'Productivity']

const getIconComponent = (iconName: string) => {
  const icons = {
    MessageSquare,
    Image,
    Code,
    FileText,
    Palette,
    Brain,
    Video,
    Music,
    Globe,
    Zap,
    Sparkles
  }
  return icons[iconName as keyof typeof icons] || MessageSquare
}

const getPricingColor = (pricing: string) => {
  switch (pricing) {
    case 'Free':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Freemium':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Paid':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPricing, setSelectedPricing] = useState('All')

  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory
      const matchesPricing = selectedPricing === 'All' || tool.pricing === selectedPricing
      
      return matchesSearch && matchesCategory && matchesPricing
    })
  }, [searchQuery, selectedCategory, selectedPricing])

  const featuredTools = filteredTools.filter(tool => tool.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">AI Tools Directory</h1>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                {aiTools.length} Tools
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Discover the Best
            <span className="text-primary block">AI Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Explore our curated collection of cutting-edge AI tools and services. 
            Find the perfect solution for your creative, productivity, and business needs.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 focus:border-primary/50 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Categories
              </h3>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <TabsList className="grid grid-cols-3 lg:grid-cols-9 w-full h-auto p-1">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Pricing Filter */}
            <div className="lg:w-64">
              <h3 className="text-sm font-medium text-foreground mb-3">Pricing</h3>
              <Tabs value={selectedPricing} onValueChange={setSelectedPricing}>
                <TabsList className="grid grid-cols-4 w-full">
                  {['All', 'Free', 'Freemium', 'Paid'].map((pricing) => (
                    <TabsTrigger
                      key={pricing}
                      value={pricing}
                      className="text-xs px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      {pricing}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Tools */}
        {featuredTools.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Star className="w-6 h-6 text-accent mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Featured Tools</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool) => {
                const IconComponent = getIconComponent(tool.icon)
                return (
                  <Card key={tool.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-white to-gray-50/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {tool.name}
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-muted-foreground ml-1">{tool.rating}</span>
                              </div>
                              <Badge className={`text-xs border ${getPricingColor(tool.pricing)}`}>
                                {tool.pricing}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {tool.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                        variant="outline"
                        onClick={() => window.open(tool.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Tool
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        )}

        {/* All Tools */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              All Tools ({filteredTools.length})
            </h2>
          </div>
          
          {filteredTools.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No tools found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => {
                const IconComponent = getIconComponent(tool.icon)
                return (
                  <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base group-hover:text-primary transition-colors truncate">
                            {tool.name}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-muted-foreground ml-1">{tool.rating}</span>
                            </div>
                            <Badge className={`text-xs border ${getPricingColor(tool.pricing)}`}>
                              {tool.pricing}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {tool.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        size="sm"
                        className="w-full"
                        variant="outline"
                        onClick={() => window.open(tool.url, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Visit
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">AI Tools Directory</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Your comprehensive guide to the best AI tools and services. 
                Discover, compare, and find the perfect AI solutions for your needs.
              </p>
              <div className="flex space-x-4">
                <Badge variant="outline">{aiTools.length} Tools Listed</Badge>
                <Badge variant="outline">{categories.length - 1} Categories</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.slice(1, 6).map((category) => (
                  <li key={category}>
                    <button 
                      onClick={() => setSelectedCategory(category)}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Featured Tools</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Free Tools</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Submit Tool</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">About</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 AI Tools Directory. Discover the future of AI technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App