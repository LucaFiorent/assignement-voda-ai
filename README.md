### 🚀 Getting Started

Follow these steps to get your development environment up and running.

### 🛠️ Step 1: Clone the repository

If you haven't already cloned the repository, use the following command to clone it locally:

git clone [https://github.com/LucaFiorent/assignement-voda-ai](https://github.com/LucaFiorent/assignement-voda-ai)
Then navigate to the project folder:

`cd ./assignement-voda-ai`

### 📦 Step 2: Install dependencies

After you've navigated to the project folder, run the following command to install all the required dependencies:

`npm install`

This will install the dependencies listed in package.json to make sure your project is ready to run.

### 🌐 Step 3: Start the development server

Once the dependencies are installed, you can start the development server with:

`npm run dev`

This will start the Vite development server, and you can access your project at:

[http://localhost:5173/](http://localhost:5173/)

You should see the app running in your browser!

### Design decisions

- The user interface is designed to be visually appealing and adaptable to different screen sizes and devices.
- A dark mode was chosen, which can be easily expanded to include a light mode using Tailwind.
- Rounded shapes enhance elegance, while slight animations improve usability.
- An optimistic UI approach is used while fetching data, assuming fast interactions and ensuring a smooth user experience, reducing flickering.
- Additionally, prefetching and caching mechanisms are implemented to minimize reload times.

### Bonus

- Enganging, responsive and creative user interface implemented. Optimistic UI for reduced flickering.

- Implemented chaching, prefetching and pagination thanks to React Query

### 💻 Technologies Used

- React
- TypeScript
- Firebase
- TanStack React Query
- Tailwind CSS
- Lucide Icons
- Zustand (State Management)
- JavaScript, HTML, CSS
- Vite
- React Router
