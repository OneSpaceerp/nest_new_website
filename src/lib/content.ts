/** Editorial content updated October 2026. Research and claim boundaries: docs/CONTENT-RESEARCH.md. */

export type ServicePage = { slug: string; title: string; eyebrow: string; intro: string; steps: { title: string; desc: string }[] };

export const site = {
  "name": "Nest Software Development",
  "short": "Nest SD",
  "tagline": "The all-in-one technical partner",
  "url": "https://nsd-eg.com",
  "logo": "/company_logo/logo-01.png",
  "logoRatio": 2.535211267605634,
  "logoDark": "/company_logo/logo-02.png",
  "logoDarkRatio": 3.276315789473684,
  "logoLegacy": "/company_logo/NestSD.png",
  "wordmark": "/company_logo/nest-wordmark-cyan.png",
  "wordmarkRatio": 3.4904013961605584,
  "favicon": "/assets/New Icon-B7XOCWKQ.png",
  "email": "info@nsd-eg.com",
  "phone": "+2010 2196 5445",
  "phoneHref": "+201021965445",
  "location": "6th Of October City, Giza, Egypt",
  "social": {
    "linkedin": "https://www.linkedin.com/company/nestsoftwaredevelopment",
    "facebook": "https://www.facebook.com/nestsoftwaredevelopment"
  }
} as const;

export const nav = [
  { "label": "nsdLabs Apps", "href": "/nsdlabs" },
  {
    "label": "OneSpace ERP",
    "href": "/onespace"
  },
  {
    "label": "MiraVoice",
    "href": "/miravoice"
  },
  {
    "label": "nsdCloud",
    "href": "/nestcloud"
  },
  {
    "label": "Web Development",
    "href": "/web-development"
  },
  {
    "label": "Mobile Apps",
    "href": "/mobile-apps"
  },
  {
    "label": "Digital Marketing",
    "href": "/digital-marketing"
  },
  {
    "label": "Infrastructure",
    "href": "/infrastructure"
  },
  {
    "label": "About",
    "href": "/about"
  }
] as const;

export const hero = {
  "eyebrow": "ONE PARTNER. A CONNECTED BUSINESS.",
  "headline": [
    "Make room",
    "for what’s next"
  ],
  "body": "Connect the systems behind your business and the experiences your customers see. ERP, communications, cloud, and digital products brought together by Nest.",
  "primary": {
    "label": "Talk about your next step",
    "href": "/#contact"
  },
  "secondary": {
    "label": "Explore our ecosystem",
    "href": "/#ecosystem"
  },
  "status": "Built in Egypt. Built around your business."
} as const;

export const statement = {
  "eyebrow": "It's as easy as asking…",
  "phrases": [
    {
      "lines": [
        [
          {
            "t": "I want to"
          },
          {
            "g": "unify"
          },
          {
            "t": "unify"
          }
        ],
        [
          {
            "t": "my"
          },
          {
            "g": "erp"
          },
          {
            "t": "operations"
          }
        ],
        [
          {
            "t": "across"
          },
          {
            "g": "globe"
          },
          {
            "t": "one system"
          }
        ]
      ]
    },
    {
      "lines": [
        [
          {
            "t": "I want to"
          },
          {
            "g": "connect"
          },
          {
            "t": "connect"
          }
        ],
        [
          {
            "t": "every"
          },
          {
            "g": "voice"
          },
          {
            "t": "office"
          }
        ],
        [
          {
            "t": "on"
          },
          {
            "g": "signal"
          },
          {
            "t": "one network"
          }
        ]
      ]
    },
    {
      "lines": [
        [
          {
            "t": "I want to"
          },
          {
            "g": "deploy"
          },
          {
            "t": "deploy"
          }
        ],
        [
          {
            "t": "my"
          },
          {
            "g": "cloud"
          },
          {
            "t": "platform"
          }
        ],
        [
          {
            "t": "with"
          },
          {
            "g": "shield"
          },
          {
            "t": "a recovery plan"
          }
        ]
      ]
    }
  ]
} as const;

export const methodology = {
  "eyebrow": "FROM AMBITION TO EVERYDAY USE",
  "heading": "Progress, with a clear next step",
  "body": "A shared brief. Visible decisions. Work your team can review at each stage. We connect the delivery process to the outcome you need.",
  "steps": [
    {
      "number": "01",
      "title": "UNDERSTAND",
      "desc": "Follow the work and find what needs to change.",
      "chips": [
        "Business priorities",
        "Current workflows",
        "Success criteria"
      ]
    },
    {
      "number": "02",
      "title": "SHAPE",
      "desc": "Turn the requirements into a practical delivery plan.",
      "chips": [
        "Experience design",
        "Scope and ownership",
        "Integration map"
      ]
    },
    {
      "number": "03",
      "title": "BUILD",
      "desc": "Make progress visible through working demonstrations.",
      "chips": [
        "Iterative delivery",
        "User feedback",
        "Workflow testing"
      ]
    },
    {
      "number": "04",
      "title": "ADOPT",
      "desc": "Prepare the people, data, and systems for daily use.",
      "chips": [
        "Launch readiness",
        "Team training",
        "Agreed support"
      ]
    }
  ]
} as const;

export const ecosystem = {
  "eyebrow": "THE NEST ECOSYSTEM",
  "heading": "Specialist focus. Shared direction.",
  "body": "OneSpace connects operations. MiraVoice connects conversations. nsdCloud supports the systems behind both. Each can solve a focused need or become part of a wider plan.",
  "brands": [
    {
      "slug": "onespace",
      "name": "OneSpace ERP",
      "href": "/onespace",
      "logo": "/brands_logo/onespace_light.png",
      "logoDark": "/brands_logo/onespace_dark.png",
      "title": "Give every team the same picture",
      "desc": "Bring finance, sales, stock, and daily work into a connected ERP environment. OneSpace helps your people move from scattered records to clearer decisions.",
      "specs": [
        {
          "k": "Focus",
          "v": "ERPNext & business workflows"
        },
        {
          "k": "Delivery",
          "v": "Implementation · integrations"
        },
        {
          "k": "Next",
          "v": "Training · ongoing improvement"
        }
      ],
      "art": "prism"
    },
    {
      "slug": "miravoice",
      "name": "MiraVoice",
      "href": "/miravoice",
      "logo": "/brands_logo/miravoice_1.png",
      "title": "Make every conversation count",
      "desc": "Give customers a clear route to the right team. MiraVoice brings business calling, queues, and branch communication into one considered experience.",
      "specs": [
        {
          "k": "Focus",
          "v": "Business phone systems"
        },
        {
          "k": "Experience",
          "v": "Office · remote · branch"
        },
        {
          "k": "Scope",
          "v": "Routing · queues · call reporting"
        }
      ],
      "art": "wave"
    },
    {
      "slug": "nestcloud",
      "name": "nsdCloud",
      "href": "/nestcloud",
      "logo": "/brands_logo/nsdcloud-light.png",
      "title": "A cloud home with a plan behind it",
      "desc": "Host the applications your business depends on with clear capacity, maintenance, backup, and recovery responsibilities. nsdCloud makes the operational details part of the conversation.",
      "specs": [
        {
          "k": "Focus",
          "v": "Application & website hosting"
        },
        {
          "k": "Operations",
          "v": "Monitoring · maintenance"
        },
        {
          "k": "Continuity",
          "v": "Backups · recovery planning"
        }
      ],
      "art": "orbit"
    }
  ]
} as const;

export const services = {
  "eyebrow": "BUILD THE NEXT PART OF YOUR BUSINESS",
  "heading": "From first impression to daily operation",
  "body": "Customers meet your business through a website, an app, or a campaign. Your team delivers the promise through its systems. We help those experiences work together.",
  "items": [
    {
      "title": "WEB DEVELOPMENT",
      "desc": "Websites, stores, and portals that make the next action clear—and connect it to the business behind the screen.",
      "stat": "Websites & applications",
      "href": "/web-development"
    },
    {
      "title": "MOBILE APPS",
      "desc": "Useful mobile experiences for customers and teams, shaped around the task that matters.",
      "stat": "iOS & Android",
      "href": "/mobile-apps"
    },
    {
      "title": "DIGITAL MARKETING",
      "desc": "Positioning, content, and campaigns connected to a measurable customer journey.",
      "stat": "Strategy & campaigns",
      "href": "/digital-marketing"
    },
    {
      "title": "GRAPHIC & MOTION",
      "desc": "A consistent creative language for your brand, from everyday content to a product launch.",
      "stat": "Identity & storytelling",
      "href": "/digital-marketing"
    },
    {
      "title": "INFRASTRUCTURE",
      "desc": "Networks, access, and continuity planning that support the way your people work.",
      "stat": "Networks & continuity",
      "href": "/infrastructure"
    }
  ]
} as const;

export const advantage = {
  "eyebrow": "CONNECTED THINKING",
  "heading": "The Nest advantage",
  "highlight": "growth",
  "body": "A website project can reveal an ERP need. An ERP rollout can expose a hosting problem. With software, communications, and infrastructure under one roof, those conversations can happen in the same room.",
  "cta": {
    "label": "Tell us what you’re building",
    "href": "/#contact"
  },
  "control": {
    "title": "See how the parts fit together",
    "body": "We define the role of each system, the information moving between them, and the people responsible. Start with one priority and build a wider plan when the business is ready."
  }
} as const;

export const industries = {
  "heading": "Your operation sets the brief",
  "body": "From trading and manufacturing to retail, services, and specialist sectors, we begin with real workflows. Industry requirements guide discovery; your people and priorities shape the solution."
} as const;

export const clientLogos = [
  "Cwater.png",
  "Kayan-Logo.png",
  "Logo-removebg-preview.png",
  "ZAD Logo.Pdf - 1.png",
  "acm.png",
  "algheres.png",
  "anivagene.png",
  "bashrety.png",
  "bioderma.png",
  "biogroup-logo.png",
  "bionnex.png",
  "cheopsprive.png",
  "dermactive.png",
  "ducray.png",
  "foltene.png",
  "fuel.png",
  "josoor.png",
  "lcs.png",
  "mustela.png",
  "nexifymd.png",
  "nuxe.png",
  "sigmaao.png",
  "svr.png",
  "trendingLogo.png",
  "uriage-logo-png_seeklogo-336109.png",
  "المستقبل1.png"
] as const;

export const clientsHeading = "// TRUSTED BY INDUSTRY LEADERS" as const;

export const onespace = {
  "title": "OneSpace ERP",
  "eyebrow": "ERP SOLUTIONS IN EGYPT",
  "logo": "/brands_logo/onespace_light.png",
  "intro": "Connect finance, sales, stock, and daily operations with a carefully planned ERP implementation."
} as const;

export const miravoice = {
  "title": "MiraVoice",
  "eyebrow": "COMMUNICATION.",
  "logo": "/brands_logo/miravoice_1.png",
  "intro": "Give customers a clear route to the right team. MiraVoice brings business calling, queues, and branch communication into one considered experience.",
  "features": [
    {
      "title": "Call routing",
      "desc": "Business hours, IVR menus, and department routes designed around your callers."
    },
    {
      "title": "Connected teams",
      "desc": "Compatible office and remote calling clients, with connectivity assessed before rollout."
    },
    {
      "title": "Recording & reporting",
      "desc": "Call visibility with agreed access, storage, retention, and recording requirements."
    }
  ]
} as const;

export const nestcloud = {
  "title": "nsdCloud",
  "eyebrow": "INFRASTRUCTURE",
  "logo": "/brands_logo/nsdcloud-light.png",
  "intro": "Host the applications your business depends on with clear capacity, maintenance, backup, and recovery responsibilities. nsdCloud makes the operational details part of the conversation.",
  "status": "Capacity, continuity, and support—defined around your workload.",
  "features": [
    {
      "title": "Hosting",
      "desc": "Resources sized for your website, application, or ERP workload.",
      "stat": "Scope-based configuration"
    },
    {
      "title": "Migration",
      "desc": "A staged move with testing, data checks, and rollback planning.",
      "stat": "Planned cutover"
    },
    {
      "title": "Operations",
      "desc": "Agreed monitoring, backup, maintenance, and escalation responsibilities.",
      "stat": "Defined service coverage"
    }
  ]
} as const;

export const servicePages: ServicePage[] = [
  {
    "slug": "web-development",
    "title": "Web Development",
    "eyebrow": "ENGINEERING",
    "intro": "Websites, customer portals, and business applications designed around useful journeys, clear content, and connected operations.",
    "steps": []
  },
  {
    "slug": "mobile-apps",
    "title": "Mobile Apps",
    "eyebrow": "MOBILE",
    "intro": "Mobile experiences for customers and teams, from focused prototypes to tested releases and ongoing improvement.",
    "steps": []
  },
  {
    "slug": "digital-marketing",
    "title": "Digital Marketing",
    "eyebrow": "GROWTH",
    "intro": "Connect positioning, content, creative, and campaigns to a customer journey you can understand and measure.",
    "steps": []
  },
  {
    "slug": "infrastructure",
    "title": "Infrastructure",
    "eyebrow": "DEVOPS",
    "intro": "Networks, access, and recovery planning designed around the systems and people your business depends on.",
    "steps": []
  }
];

export const about = {
  "eyebrow": "ABOUT NEST",
  "heading": "A connected way to build what comes next",
  "intro": "Nest Software Development is based in 6th of October City, Giza. We bring business systems, digital experiences, communications, and infrastructure into one technical partnership.",
  "mission": {
    "title": "Make technology useful in the working day",
    "body": "Our work begins with the task: the order that needs to move, the customer who needs an answer, or the team that needs a dependable system. We turn those needs into a clear scope and a practical path to delivery."
  },
  "vision": {
    "title": "Give growing businesses room to move",
    "body": "We believe the systems behind a business should support its next step. Our aim is to build connections that make change easier to manage, with people, ownership, and long-term maintenance considered from the start."
  },
  "products": [
    {
      "name": "OneSpace",
      "logo": "/brands_logo/onespace_dark.png",
      "kicker": "BUSINESS OPERATIONS",
      "title": "One connected view of the work.",
      "body": "OneSpace brings finance, sales, stock, purchasing, projects, and everyday operations into a considered ERP environment. We shape the implementation around your workflows, data, and people.",
      "href": "/onespace",
      "action": "Explore OneSpace"
    },
    {
      "name": "MiraVoice",
      "logo": "/brands_logo/miravoice_1.png",
      "kicker": "BUSINESS COMMUNICATIONS",
      "title": "Every call has somewhere better to go.",
      "body": "MiraVoice helps teams handle business calls across offices and supported remote work. We design the routes, queues, and handovers around how customers reach your people.",
      "href": "/miravoice",
      "action": "Explore MiraVoice"
    },
    {
      "name": "nsdCloud",
      "logo": "/brands_logo/nsdcloud-dark.png",
      "kicker": "HOSTING & CONTINUITY",
      "title": "A cloud home with a plan behind it.",
      "body": "nsdCloud gives websites, applications, and business systems a managed home with clear capacity, monitoring, backups, maintenance, and recovery responsibilities.",
      "href": "/nestcloud",
      "action": "Explore nsdCloud"
    }
  ]
} as const;

export const contact = {
  "eyebrow": "LET’S START WITH YOUR BUSINESS",
  "heading": "What would you like to work better?",
  "fields": {
    "name": "YOUR NAME",
    "email": "EMAIL ADDRESS",
    "message": "YOUR PROJECT OR CHALLENGE"
  },
  "success": {
    "title": "Continue in your email app",
    "body": "Your message has been prepared for your email app. Review and send it there to complete your enquiry. If it did not open, email info@nsd-eg.com directly.",
    "again": "RETURN TO THE FORM"
  },
  "labels": {
    "email": "EMAIL",
    "phone": "PHONE",
    "location": "FIND US"
  }
} as const;

export const privacy = {
  "title": "PRIVACY POLICY.",
  "sections": [
    {
      "heading": "1. Information We Collect",
      "body": "We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Site, or otherwise when you contact us."
    },
    {
      "heading": "2. How We Use Your Information",
      "list": [
        "To facilitate account creation and logon process.",
        "To send administrative information to you.",
        "To fulfill and manage your orders and service requests.",
        "To deliver targeted advertising and marketing communications."
      ]
    },
    {
      "heading": "3. Will Your Information Be Shared?",
      "body": "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not sell your personal data to third-party data brokers."
    },
    {
      "heading": "4. Security of Your Information",
      "body": "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no method of transmission over the Internet is 100% secure."
    },
    {
      "heading": "5. Contact Us",
      "body": "If you have questions or comments about this policy, you may email us at info@nsd-eg.com."
    }
  ]
} as const;

export const terms = {
  "title": "TERMS OF SERVICE.",
  "sections": [
    {
      "heading": "1. Agreement to Terms",
      "body": "These Terms of Service constitute a legally binding agreement made between you and Nest Software Development concerning your access to and use of the Site and our services."
    },
    {
      "heading": "2. Intellectual Property Rights",
      "body": "Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site are owned or controlled by us or licensed to us."
    },
    {
      "heading": "3. User Representations",
      "body": "By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information; (3) you have the legal capacity and you agree to comply with these Terms of Service."
    },
    {
      "heading": "4. Software Engineering Services",
      "body": "For clients entering into a Master Service Agreement (MSA) or Statement of Work (SOW) with Nest Software Development, those specific contractual documents supersede any conflicting terms listed here on our general website Terms of Service regarding project delivery, liabilities, and warranties."
    },
    {
      "heading": "5. Governing Law",
      "body": "These terms shall be governed by and defined following the laws of Egypt. Nest Software Development and yourself irrevocably consent that the courts of Egypt shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms."
    }
  ]
} as const;

export const ecosystemRow = {
  "label": "Part of the Nest ecosystem",
  "brands": [
    {
      "name": "OneSpace ERP",
      "href": "/onespace",
      "logo": "/brands_logo/onespace_dark.png",
      "ratio": 2.061269146608315,
      "caption": "ERP solutions & implementation"
    },
    {
      "name": "MiraVoice",
      "href": "/miravoice",
      "logo": "/brands_logo/miravoice_1.png",
      "ratio": 1.3766461808604038,
      "caption": "Business communications"
    },
    {
      "name": "nsdCloud",
      "href": "/nestcloud",
      "logo": "/brands_logo/nsdcloud-dark.png",
      "ratio": 4.946601941747573,
      "caption": "Cloud infrastructure"
    },
    {
      "name": "nsdLabs",
      "href": "/nsdlabs",
      "logo": "/nsdlabs/nsdlabs-dark.png",
      "ratio": 2.6740547588,
      "caption": "Custom ERPNext apps"
    }
  ]
} as const;

export const footer = {
  "columns": [
    {
      "title": "ECOSYSTEM",
      "links": [
        { "label": "nsdLabs Apps", "href": "/nsdlabs" },
        {
          "label": "OneSpace ERP",
          "href": "/onespace"
        },
        {
          "label": "MiraVoice",
          "href": "/miravoice"
        },
        {
          "label": "nsdCloud",
          "href": "/nestcloud"
        }
      ]
    },
    {
      "title": "SERVICES",
      "links": [
        {
          "label": "Web Development",
          "href": "/web-development"
        },
        {
          "label": "Mobile Apps",
          "href": "/mobile-apps"
        },
        {
          "label": "Digital Marketing",
          "href": "/digital-marketing"
        },
        {
          "label": "Infrastructure",
          "href": "/infrastructure"
        }
      ]
    },
    {
      "title": "COMPANY",
      "links": [
        {
          "label": "About",
          "href": "/about"
        },
        {
          "label": "Contact",
          "href": "/#contact"
        }
      ]
    }
  ]
} as const;
