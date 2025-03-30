# Top-Up for Users Component

## Description

This repository contains my implementation of the "Top-Up for Users" component from the Telgea Frontend Candidate Test. The component allows users to request a top-up for their mobile plan through a multi-step flow including phone verification, option selection, date selection, and international data options.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - For type safety and better developer experience
- **Tailwind CSS** - For styling
- **React Context API** - For state management
- **React Hooks** - For component logic and optimization

## Features Implemented

- Complete multi-step flow for mobile plan top-up requests
- Phone number validation
- Selection of top-up options (data, minutes, international)
- Country selection for international data
- Date selection for scheduling top-ups
- Error handling and loading states
- Responsive design matching the Figma specifications

## How to Run

1. Clone the repository
2. Navigate to the project directory: `cd task1-ui-component/test-project`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app directory with routes and page components
- `/app/components` - UI components organized by feature
- `/app/context` - Context providers for state management
- `/app/hooks` - Custom React hooks
- `/app/services` - Mock API services
- `/data` - JSON data files for texts and mock content
- `/public` - Static assets including images and icons

## Technical Notes & Optimizations

### Architecture Decisions

1. **Context-based State Management**

   - Used multiple contexts (Navigation, DataStore, LoadingError, UI) to separate concerns
   - Implemented custom hooks for better reusability and encapsulation

2. **Performance Optimizations**

   - Implemented component memoization with React.memo
   - Used useCallback for event handlers to prevent unnecessary rerenders
   - Applied useMemo for derived values and computations
   - Separated rendering logic into smaller, focused components

3. **Progressive Enhancement**
   - Implemented client-side validation with server-side fallbacks
   - Added loading states and error boundaries for better UX

### Trade-offs and Considerations

1. **Navigation Approach**

   - Chose to implement a custom navigation system instead of relying solely on Next.js routing
   - This allowed for a smoother UX with state preservation between steps
   - Trade-off: More complex codebase but better user experience

2. **Mock Data & API**

   - Used JSON files for text content to simulate i18n capabilities
   - Implemented mock API services with artificial delays to simulate real-world conditions
   - Structured data for easy replacement with real API calls

3. **Styling**

   - Used Tailwind CSS for rapid development matching the design
   - Added custom animations for subtle interactions
   - Trade-off: Some custom CSS was needed for specific design elements

4. **Testing**
   - Due to time constraints, focused on manual testing of all flows
   - Applied strict TypeScript typing to catch potential issues early

## Future Improvements

With more time, I would add:

- Comprehensive unit and integration tests
- Full internationalization support
- Additional accessibility features
- Server-side rendering optimization
- More animated transitions between steps

## Task 3: Handling Design Inconsistencies & Responsiveness

When working with a designer, I would first discuss the inconsistencies to ensure alignment with the intended design system. Issues like uneven spacing or font variations should be resolved to maintain visual consistency and improve maintainability. For responsiveness, I would clarify breakpoints and propose a flexible layout that adapts well across devices, ensuring usability. If needed, I’d create a quick prototype or suggest CSS techniques (e.g., fluid typography, grid adjustments) to demonstrate potential improvements. The key is open communication and balancing design intent with technical feasibility to deliver a polished, scalable UI.


