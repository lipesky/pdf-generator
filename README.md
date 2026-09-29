# PDF Template Designer & Live Previewer

An interactive, visual template designer and live preview studio for HTML-to-PDF report generation engines. Built with **Vue 3**, **Vite**, and **PrimeVue**.

---

## Overview

Generating complex, multi-page PDF documents from HTML/CSS usually requires precise coordination between headers, footers, margins, and body content. 

This project provides a live design studio that allows developers and designers to:
- Visually design and preview report templates in real-time.
- Adjust document margins on the fly.
- Test modular template components (`/header`, `/body`, `/footer`).
- Generate and copy the JSON payload required by headless browser PDF rendering microservices (such as Puppeteer or Playwright).

## Architecture

```
                   +------------------------------------+
                   |     PDF Template Designer (UI)     |
                   |       (Vue 3 + PrimeVue Studio)    |
                   +-----------------+------------------+
                                     |
                1. Requests PDF blob | 2. Sends template URLs & margins
                                     v
                   +------------------------------------+
                   |     PDF Generator Microservice     |
                   |      (Puppeteer / Headless Chrome) |
                   +-----------------+------------------+
                                     |
                       3. Fetches rendered HTML routes
                                     |
         +---------------------------+---------------------------+
         |                           |                           |
         v                           v                           v
+-----------------+         +-----------------+         +-----------------+
|  /#/header      |         |  /#/body        |         |  /#/footer      |
|  (ReportHeader) |         |  (ReportBody)   |         |  (ReportFooter) |
+-----------------+         +-----------------+         +-----------------+
```

### Modular Route Design
- **`/#/`**: The visual studio for live previewing and margin adjustments.
- **`/#/header`**: Header component template rendered on each page.
- **`/#/body`**: Main report body content (supports multi-page pagination and card layouts).
- **`/#/footer`**: Footer component with automatic date and page number markers.

---

## Features

- **Live Debounced Preview**: Automatically triggers PDF regeneration when inputs or margins are modified.
- **Dynamic Margins**: Interactive controls for top, right, bottom, and left margins.
- **Payload Inspector**: Modal dialog to view, format, and copy the JSON payload for backend consumption.
- **Modern UI**: Styled with PrimeVue and PrimeFlex with a dark/light responsive layout.
- **Docker Ready**: Includes a multi-stage Dockerfile and docker-compose configuration.

---

## API Contract

The designer communicates with the PDF microservice via `POST /api` with the following contract:

```json
{
    "body": {
        "url": "http://localhost:3000/#/body"
    },
    "header": {
        "url": "http://localhost:3000/#/header"
    },
    "footer": {
        "url": "http://localhost:3000/#/footer"
    },
    "pageOptions": {
        "margin": {
            "top": "3cm",
            "right": "1cm",
            "bottom": "1cm",
            "left": "1cm"
        }
    }
}
```

The server is expected to return the rendered PDF binary (`application/pdf`) as a blob.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/) (Classic or Berry)

### Installation & Local Run

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/pdf-gen.git
   cd pdf-gen/designer
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Start the development server:
   ```bash
   yarn dev
   ```

5. Open your browser at `http://localhost:5173`.

---

## Running with Docker

You can build and run the designer using Docker:

```bash
docker compose up --build
```

The application will be available at `http://localhost:3000`.

---

## Project Structure

```
pdf-gen/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI workflow
├── designer/
│   ├── src/
│   │   ├── assets/             # Logos and static icons
│   │   ├── designer/
│   │   │   └── DesignerPage.vue # Main visual studio component
│   │   ├── example/
│   │   │   ├── ReportBody.vue   # Sample report body template
│   │   │   ├── ReportFooter.vue # Sample report footer template
│   │   │   └── ReportHeader.vue # Sample report header template
│   │   ├── router.ts           # Vue router configuration
│   │   ├── App.vue
│   │   └── main.js
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   └── yarn.lock
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## License

This project is licensed under the [MIT License](LICENSE).
