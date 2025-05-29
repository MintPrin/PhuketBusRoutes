# Phuket Bus Routes & Schedules

A comprehensive, mobile-first website providing detailed bus schedules and route information for tourists and locals traveling in Phuket, Thailand. Features complete transportation solutions from Phuket International Airport to major destinations including Patong, Karon, Kata beaches and Phuket Town.

## 🚌 Features

- **Complete Route Information**: Detailed schedules for routes P1, P2, and P3
- **Bilingual Support**: Full English and Thai language support with URL-based routing
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Smart Route Planning**: Intelligent navigation with Google Maps integration
- **Real-time Information**: Current bus schedules and fare information
- **SEO Optimized**: International SEO with hreflang tags and structured data

## 🌐 Live Demo

Visit the live website: [Phuket Bus Routes](https://phuketbusroutes.com)

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite
- **Backend**: Express.js with TypeScript
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Inter (English) and Bai Jamjuree (Thai)

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/phuket-bus-routes.git
cd phuket-bus-routes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5000`

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── i18n/           # Internationalization files
│   │   ├── lib/            # Utility functions
│   │   └── data/           # Static data and types
│   └── public/             # Static assets
├── server/                 # Backend Express server
├── shared/                 # Shared types and schemas
└── docs/                   # Documentation
```

## 🌍 Internationalization

The website supports two languages:

- **English**: Default language (`/`)
- **Thai**: Accessible via `/th/` prefix

### Adding New Languages

1. Create a new translation file in `client/src/i18n/`
2. Add the language to the `Language` type
3. Update the routing configuration
4. Add hreflang meta tags

## 🚌 Route Information

### P1 - Smart Bus (Light Blue)
- **Route**: Airport → Patong Beach
- **Fare**: Distance-based (15-100 THB)
- **Schedule**: Regular departures throughout the day

### P2 - Smart Bus (Orange)  
- **Route**: Airport → Karon → Kata Beach
- **Fare**: Distance-based (15-100 THB)
- **Schedule**: Regular departures throughout the day

### P3 - Smart Bus (Dark Blue)
- **Route**: Airport → Phuket Town → Bus Terminal
- **Fare**: Distance-based (15-50 THB)
- **Schedule**: Regular departures throughout the day

## 🎨 Design System

The website uses a custom design system with:

- **Colors**: Ocean blue primary (#0ea5e9) with complementary palette
- **Typography**: Inter for English, Bai Jamjuree for Thai
- **Components**: Consistent spacing, borders, and interactive states
- **Responsive**: Mobile-first approach with tablet and desktop breakpoints

## 📱 Mobile Optimization

- Progressive Web App (PWA) capabilities
- Touch-friendly interface design
- Optimized font loading for Thai and English
- Efficient data loading and caching

## 🔍 SEO Features

- **International SEO**: Hreflang tags for multilingual content
- **Structured Data**: Schema.org markup for transportation services
- **Performance**: Optimized Core Web Vitals
- **Meta Tags**: Comprehensive Open Graph and Twitter Card support
- **Sitemap**: Automatic XML sitemap generation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Follow TypeScript best practices
2. Use the existing component patterns
3. Maintain accessibility standards
4. Test on mobile devices
5. Ensure bilingual support for new features

### Code Style

- Use TypeScript for all new code
- Follow the existing naming conventions
- Add proper type definitions
- Include appropriate ARIA labels for accessibility

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Phuket Airport Bus Service for route information
- Thai tourism authorities for destination data
- Community contributors and translators

## 📞 Support

For questions or support, please open an issue on GitHub or contact the maintainers.

---

**Built with ❤️ for travelers exploring beautiful Phuket, Thailand**