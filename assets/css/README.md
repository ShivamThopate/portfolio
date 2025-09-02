# CSS Architecture Documentation

This directory contains the modular CSS structure for the personal portfolio website.

## File Structure

### Core Files
- **`main.css`** - Main import file that includes all CSS modules
- **`base.css`** - CSS variables, global styles, typography, and utility classes
- **`responsive.css`** - All responsive styles and media queries

### Component Files
- **`navbar.css`** - Navigation styles
- **`hero.css`** - Hero section styles
- **`home.css`** - Home page specific styles
- **`about.css`** - About section styles
- **`projects.css`** - Projects section styles
- **`experience.css`** - Experience section styles
- **`contact.css`** - Contact section styles
- **`tech-stack.css`** - Tech stack section styles
- **`resume.css`** - Resume section styles
- **`footer.css`** - Footer styles

### Utility Files
- **`buttons.css`** - Button styles and variants

## Usage

### For Development
Include the main CSS file in your HTML:
```html
<link rel="stylesheet" href="assets/css/main.css">
```

### For Production
You can concatenate all CSS files into a single file for better performance.

## CSS Variables

The design system uses CSS custom properties defined in `base.css`:

- **Colors**: Primary charcoal, secondary charcoal, accent indigo
- **Typography**: Font families, sizes, line heights
- **Spacing**: 8px grid system
- **Shadows**: Multiple shadow levels
- **Transitions**: Duration and easing functions
- **Breakpoints**: Responsive breakpoints

## Responsive Design

The CSS is built with a mobile-first approach and includes:
- Responsive typography using `clamp()`
- Flexible grid systems
- Touch-friendly interactions
- iOS-specific optimizations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## File Naming Convention

- Use kebab-case for file names
- Group related styles in the same file
- Keep files focused on a single responsibility
- Use descriptive names that indicate the purpose

## Maintenance

- Update CSS variables in `base.css` for design system changes
- Add new component files as needed
- Update `main.css` imports when adding new files
- Test responsive behavior across different screen sizes
