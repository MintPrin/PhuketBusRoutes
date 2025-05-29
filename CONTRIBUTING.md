# Contributing to Phuket Bus Routes

Thank you for your interest in contributing to the Phuket Bus Routes project! This guide will help you get started.

## Code of Conduct

Please be respectful and inclusive in all interactions. We welcome contributions from developers of all backgrounds and experience levels.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a new branch for your feature: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Test thoroughly
7. Submit a pull request

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add proper type definitions
- Use functional components with hooks
- Follow the existing component structure

### Accessibility

- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios
- Use semantic HTML elements

### Internationalization

- All user-facing text must be translatable
- Add new translation keys to both `en.ts` and `th.ts`
- Test language switching functionality
- Maintain consistent tone across languages

### Mobile-First Design

- Design for mobile devices first
- Test on various screen sizes
- Ensure touch targets are appropriately sized
- Optimize for performance on slower networks

## Types of Contributions

### Bug Reports

When reporting bugs, please include:
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser and device information
- Screenshots if applicable

### Feature Requests

For new features, please describe:
- The problem you're trying to solve
- Your proposed solution
- Any alternative approaches considered
- Potential impact on existing functionality

### Code Contributions

#### Frontend (React/TypeScript)

- Components should be reusable and well-documented
- Follow the existing design system
- Ensure responsive design
- Test across different browsers

#### Backend (Express/TypeScript)

- Keep API routes thin and focused
- Use proper error handling
- Follow RESTful conventions
- Document API endpoints

#### Data and Translations

- Bus route data should be accurate and up-to-date
- Translation contributions from native speakers are especially welcome
- Verify information with official sources when possible

## Testing

Before submitting a pull request:

1. Test your changes on multiple devices
2. Verify language switching works correctly
3. Check that all routes and schedules display properly
4. Ensure accessibility standards are maintained
5. Test with slow network conditions

## Pull Request Process

1. Update documentation if needed
2. Add or update tests as appropriate
3. Ensure your code follows the style guidelines
4. Write a clear description of your changes
5. Link any related issues

### PR Checklist

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated as needed
- [ ] Documentation updated if necessary
- [ ] Accessibility requirements met
- [ ] Mobile responsiveness verified
- [ ] Translation keys added for new text

## Translation Guidelines

### For Thai Translations

- Use formal but accessible language
- Consider cultural context for transportation terms
- Maintain consistency with official Thai tourism terminology
- Test text rendering with the Bai Jamjuree font

### For English Translations

- Use clear, simple language suitable for international visitors
- Avoid complex transportation jargon
- Consider mobile screen space when writing text
- Maintain friendly but professional tone

## Performance Considerations

- Optimize images and assets
- Minimize bundle size impact
- Consider Core Web Vitals metrics
- Test on slower devices and networks
- Use efficient data structures

## Questions or Help

If you need help with any aspect of contributing:

1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Join community discussions
4. Reach out to maintainers

## Recognition

Contributors will be acknowledged in the project documentation. Significant contributions may be highlighted in release notes.

Thank you for helping make transportation information more accessible for visitors to Phuket!