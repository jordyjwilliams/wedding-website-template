// All website copy/content organized by section
// This makes it easy to update text without touching components

import { WEDDING } from '$lib/constants';

export const COPY = {
  // Meta / SEO
  meta: {
    title: 'N ♡ J  — Wedding',
    description: 'Join us for a three-day wedding weekend',
  },

  // Navigation
  nav: {
    home: 'Home',
    aboutUs: 'Our Story',
    wedding: 'Wedding',
    venue: 'Venue',
    faqs: 'FAQs',
    rsvp: 'RSVP',
  },

  // Footer
  footer: {
    message: 'From Australia with',
    icon: 'ph:heart-fill',
    byLabel: ' · template',
    names: `by ${WEDDING.couple.groom}`,
    linkHref: 'https://github.com/jordyjwilliams/wedding-website-template',
  },

  // Most tooltips can be written in place
  // This contains definitions for more complex (or reusable) tooltips.
  inlineTooltips: {
    slang: `If terms like: [VB](https://www.urbandictionary.com/define.php?term=VB), [frothies](https://www.urbandictionary.com/define.php?term=frothie), [brekkie](https://www.urbandictionary.com/define.php?term=brekkie), [snags](https://www.youtube.com/shorts/xTSrDoWRqlU) and [servo](https://www.urbandictionary.com/define.php?term=servo) confuse you, check out [this guide](http://csu.edu.au/current-students/support/international-students/english-language-support/aussie-slang-words-and-phrases).`,
    coffee: `The Melbourne ['Magic'](https://distefano.com.au/blogs/drinks/what-is-a-magic-coffee-melbourne) is a must-try. But it's doubtful you'll find one nearby our venue!`,
    meeting: `We remember this part of the story differently, Jordy is convinced he was listening to music and Nicole and Megan spoke to him first.`,
    bones: `This is known to the tourists as the Bone Church, and well - that pretty much sums it up. See [here for more info](https://www.sedlec.info/en/ossuary/)`,
    rfds: `Big thanks to Anita, Chris, Jenny; and all those who helped us whist we were temporarly stranded in [Perth and Kununurra](https://www.google.com/maps/dir/Kununurra,+Western+Australia+6743/Perth,+Western+Australia/@-23.491601,111.6372616,3638980m).`,
    thailand: `Nicole's first time in South East Asia - From the hectic streets of Bangkok and exploring [medical history museums](https://yourthaiguide.com/siriraj-medical-museum-nicknamed-the-museum-of-death/) to chilling with dugongs on [Koh Muk](https://www.adventuresofjellie.com/thailand/the-sleepy-paradise-of-koh-mook), to getting very car-sick on a bus to Pai and having our sceneic viewes be somewhat altered by the burning season. Thailand was an amazing gateway to the start of our South East Asia trip.`,
    laos: `A quick whistle stop tour of Laos. Jordy's Dad Gareth tried to save money and ate a questionalable [Laos Sandwich](https://inside-laos.com/2020/02/05/baguettes/) (Khao Jee Pâté) and suffered food posioning on a 2 day [boat trip](https://www.margauxsfootprints.com/post/complete-guide-for-the-slow-boat-from-thailand-to-laos) from Chang Rai to Luang Prabang.`,
    philippines: `Our time island hoppping in the Philippines was amazing! From interesting translations of local food **Sisig** being translated as 'pork face' was a personal fave, to Jordy and Gareth getting to dive together at the iconic: [Barracuda Lake](https://www.padi.com/dive-site/philippines/barracuda-lake-2/), [Olympia](https://www.padi.com/dive-site/philippines/olympia-maru/), and [Kogyo](https://www.padi.com/dive-site/philippines/kogyo-maru/) Maru dive sites.`,
    us: `[Rock, Flag and Eagle](https://www.youtube.com/watch?v=iIhUg-VDA60); More informations about Jordy's and Nicoles US trips can be [found here](/our-story#chapterFour).`,
    uk: `Tea, Toast, Crumpets and Pints. Nicole's culture shock of the UK can be seen further described [here](/our-story#chapterThree).`,
    belgium: `Home of the world's greatest beer. Also chocolate, waffles, and three-native languages. Definitely a slept on area of Europe. It's a [fairy-tale land](https://www.youtube.com/watch?v=bDErK6iOG3Q).`,
    family: `Where they also experienced the USA culture shock, similar to that [described here](/our-story#chapterFour).`,
  },

  // Hero Section
  hero: {
    eyebrow: 'are getting married',
    ctaButton: 'RSVP Now →',
  },

  // Our Story Section
  about: {
    title: 'Our Story',
    emoji: '',
    intro: 'Once upon a time, on a train in the Czech Republic...',
    overviewTitle: '',
    storySectionsTitle: 'A Picture Says a Thousand Words',
    loveFactsTitle: 'The Highlights Reel',

    story: `[If you know us](tooltip:And if you're reading this, you probably do), sorry, you've definitely heard parts of this before.\n\n
    It all **started** in **2019** on a **train from Prague to Kutná Hora**.
    Nicole and her friend Megan were discussing amongst themselves if the train was going in the [right direction](tooltip: Because this can be complicated for Americans to figure out in Europe!)
    when this annoying man with a crutch in a blue tie dye t-shirt butted in on [their conversation](tooltip:meeting).\n\n
    They got to talking about their plans for the day, and it turned they were pretty much the same. From there, they decided to explore Kutná Hora together.\n\n
    They spent the day wandering [Sedlec Ossuary](tooltip:bones) (the "Bone Church").
    Nothing sets the scene like a **chandelier made of human ribs**.
    Between train beers, gothic bridges, and a quick goodbye at the station, **something clicked**.\n\n

    The next day, Nicole flew home to the **USA**, Jordy returned to **Berlin**, and that should have been the end of the story. However **fate had other ideas**.\n\n

    What followed, was a whirlwind of reunions: a week-long "first date" ([traveling Iceland in a van](/our-story#chapterTwo)), meeting the parents in [the UK](/our-story#chapterThree) and [the US](/our-story#chapterFour),
    a **sunrise hike** up a volcano ([Mount Teide](https://whc.unesco.org/en/list/1258/)) in [Tenerife](/our-story#chapterFive), and Jordy surviving his first [American Christmas](tooltip:Think structured family photos, an abundance of cookies, and no public holiday on 26th of December.). Then, **the world shut down**.
    After **eight months** of border closures and visa loopholes, Nicole made it to [Berlin](tooltip:Nicole must be one of the only people who lived in Berlin for 3 months without stepping foot a club!) for a three month [lockdown reunion](/our-story#chapterNine) before mixing things up and moving [down under](tooltip:Where the beers flow and grown men chunder!).`,
    // NOTE: Differing landscape and portrait images render in different sized cards.
    storySections: {
      entries: {
        chapterOne: {
          title: 'June 2019 • Prague',
          icon: 'ph:train',
          imageSrc: '/images/story/bone-church.webp',
          imageAlt: 'The first meeting: Sedlec Ossuary — the Bone Church, Czech Republic',
          overview: 'Where it all Began.',
          description: `The [Bone Church](tooltip:bones)`,
          bullets: [
            `The train ride that **started it all**.`,
            `One missed opportunity for Jordy to **mind his own business**.`,
            `One afternoon that led, via [Iceland](/our-story#chapterTwo), [Lockdowns](/our-story#chapterNine), ["Van Life"](/our-story#chapterEleven), [two dogs and a cat](/our-story#chapterThirteen), to a [proposal](/our-story#chapterFourteen) and a planning a [wedding](/wedding).`,
          ],
        },
        chapterTwo: {
          title: 'July 2019 • Iceland',
          icon: 'ph:van',
          imageSrc: '/images/story/iceland.webp',
          imageAlt: 'First Date: Iceland road trip, July 2019',
          overview: 'A week travelling in a van together.',
          description: `**Spoiler:** Jordy was **not a murderer**.`,
          bullets: [
            `Iceland is pretty.`,
            `Hot-springs are nice.`,
            `Nicole was [24 hours late](tooltip:Causing Jordy to think he was getting stood up.) due to flight delays.`,
            `The road trip that gave us the [van life bug](/our-story#chapterEleven).`,
          ],
        },
        chapterThree: {
          title: 'August 2019 • UK',
          icon: 'ph:coffee',
          imageSrc: '/images/story/cornwall.webp',
          imageAlt: 'Meeting the parents: Cornwall, UK, August 2019',
          overview: 'Nicole survived meeting the British family.',
          description: `The accent barrier was bridged with more than an occasional **cup of tea**.`,
          bullets: [
            'Nicole **marvelled** at the fact that Pubs, houses and schools existed that were **older than the Continental US**.',
            '**Cornish** pastys, [country pubs](tooltip:Warm beer and flat, dry cider! Delicious), walks with Digby **(RIP)**, and other British oddeties.',
            'Then across the Atlantic — [Jordy heads west](/our-story#chapterFour) for round two.',
          ],
        },
        chapterFour: {
          title: 'October 2019 • Wyoming',
          icon: 'ph:football',
          imageSrc: '/images/story/wyoming.webp',
          imageAlt: 'First time in freedomland: Wyoming, USA, October 2019',
          overview:
            '[Cowboys](https://www.youtube.com/shorts/QHYOqvAAgfM), "coffee" and "football"',
          description: `Jordy's first trip to [the States](https://www.youtube.com/watch?v=M11SvDtPBhA). He learned that **'small'** [coffees](https://www.youtube.com/shorts/wqJYOQSe8Ik) are actually **the size of his head**.`,
          bullets: [
            "['Football'](https://youtu.be/WjFm4SwxuRM?si=gb8J9BSsXuSjfRMO) games have a **rugby match amount of time** pass before **10 mins** of game play has been counted.",
            'But there are [beer songs](https://www.youtube.com/watch?v=BEY0R5jQv8M), [horses](https://www.youtube.com/shorts/sZpnLElunWw) and [cheerleaders](https://www.youtube.com/shorts/HuV9Hk8_yJw).',
            'There are differences between sports in the [US and the UK](https://www.youtube.com/shorts/C7CHr7Xp8wg).',
          ],
        },
        chapterFive: {
          title: 'February 2020 • Tenerife',
          icon: 'ph:island',
          imageSrc: '/images/story/tenerife.webp',
          imageAlt: 'Sunrise hike up a volcano: Tenerife, February 2020',
          overview: 'Volcanoes, beaches and winding roads.',
          description: `A scenic **sunrise hike up a volcano**!`,
          bullets: [
            `Don't worry, we practiced the timing the day before by **misjudging the hike length** and getting **lost in the dark**.`,
            `Also **Café con Miel** (Coffee with honey) contains **rum**, (Not always advertised). But very welcome!`,
          ],
        },
        chapterSix: {
          title: 'December 2019 • Arizona',
          icon: 'ph:gift',
          imageSrc: '/images/story/usa-xmas.webp',
          imageAlt: 'First American Christmas, December 2019',
          overview: `Jordy's first American Christmas.`,
          description: `A dizzying introduction to competitive [gift-wrapping](https://www.youtube.com/watch?v=wL4nYpqB6aY&t=229s), lights on [every surface](https://www.youtube.com/shorts/XK-Wo5aAB9s), decorations in every corner, and portions of food that are [comically large](https://www.youtube.com/shorts/HKFjVLVe_7Y).`,
          bullets: [
            '**Mario Kart Cactus** ([Saguaro](https://en.wikipedia.org/wiki/Saguaro)) exist in Tucson.',
            'They wear **Christmas hats** and are [decorated](https://www.youtube.com/shorts/SzUTX6V_7UI) for the occasion.',
          ],
        },
        chapterSeven: {
          title: 'March 2020 • Berlin',
          icon: 'ph:wall',
          imageSrc: '/images/story/berlin-first.webp',
          imageAlt: 'First time in Berlin, March 2020',
          overview: `Süss war Gestern - Nicole's first (and only) Berlin Club.`,
          description: `Nicole's first Berlin scouting mission. She came for the **vibes**, stayed for the **currywurst**.`,
          bullets: [
            `We got chased by a Boar when on a lake-side walk.`,
            `It did **NOT** take [Nicole's sausage](https://www.independent.co.uk/news/world/europe/naked-man-wild-boar-chase-nudist-naturist-laptop-berlin-a9659881.html).`,
            `Little did we know, [Berlin had one more chapter](/our-story#chapterNine) left for us.`,
          ],
        },
        chapterEight: {
          title: 'March 2020 • The Last Flight',
          icon: 'ph:face-mask',
          imageSrc: '/images/story/last-flight.webp',
          imageAlt: 'The last flight before lockdown, March 2020',
          overview: 'Before the world changed forever.',
          description: `Jordy was departing a flight from the USA. When **COVID-19** was [declared a pandemic](https://www.youtube.com/watch?v=xKPWngYf2Wk).`,
          bullets: [
            'Our plans to move to [Australia](https://www.youtube.com/shorts/T5Z9nEZZ8x0) were halted.',
            '**Endless months** of long-distance and uncertainty followed.',
            'Rescheduling, cautious optimism, and far more knowledge of **border policies** than anyone should have.',
            'A [Berlin lockdown reunion](/our-story#chapterNine) and then [Australian quarantine](/our-story#chapterTen) eventually brought us to the same continent.',
          ],
        },
        chapterNine: {
          title: 'November 2020 • Berlin (Lockdown)',
          icon: 'ph:heart',
          imageSrc: '/images/story/berlin-lockdown.webp',
          imageAlt: 'Lockdown Part 1: Berlin, November 2020',
          overview: 'Lockdown Part 1: Love is Not Tourism Era',
          description: `Deciding to move countries during a pandemic is, admittedly an **interesting** choice. A **true test** of our relationship, but we made it through!`,
          bullets: [
            '**Nicole** moved to Berlin for **three months** of lockdown.',
            'We spent **90%** of our time in a **tiny share house**, which we thought was the ultimate **relationship stress test** — until [Australian hotel quarantine](/our-story#chapterTen).',
          ],
        },
        chapterTen: {
          title: 'February 2021 • Australia (Quarantine)',
          icon: 'ph:globe-hemisphere-east',
          imageSrc: '/images/story/australia-quarantine.webp',
          imageAlt: 'Lockdown Part 2: Arriving in Australia, February 2021',
          overview: 'Lockdown Part 2: New Continent, New Country, Same Chaos',
          description: `We kicked off our Australian chapter with **14 days in hotel quarantine**.`,
          bullets: [
            `Nothing says 'I love you' like being **legally forbidden** from leaving each other's sight for **336 hours**.`,
            'Frog marched off the plain by the [ADF](tooltip:Australian Defence Force, essentially the Army) to be escorted to a hotel.',
            'Crazily enough - after the 14 days were up we had a lot more freedom in [WA](tooltip:Western Australia) than we were [used to](tooltip:Hardly any cases, no masks, no lockdown; relative freedom!).',
            'Which turned out to be the perfect launchpad for [two years of van life](/our-story#chapterEleven).',
          ],
        },
        chapterEleven: {
          title: `2021 • Our "Van Life" Era`,
          icon: 'ph:van',
          imageSrc: '/images/story/van-life.webp',
          imageAlt: 'Van life adventures, 2021',
          overview: `Delilah The Delica`,
          description: `Where **"She'll be right"** are famous last words, and every sunset is worth a breakdown.`,
          bullets: [
            'Our **1995 Mitsubishi Delica**, Delilah, was our **first home** purchased together.',
            `Jordy's lack of ability as a **bush-mechanic** led to unexpected trip from [Kununurra to Perth](https://www.google.com/maps/dir/Kununurra,+Western+Australia+6743/Perth,+Western+Australia/@-23.491601,111.6372616,3638980m) for a skin-graft.`,
            `We did not let minor medical issues stop us!`,
            `It only took us ~2 years but we managed to make it three-quarters of the way round Australia.`,
            `Delilah even made it to remote locations like Punamii-Uunpuu (Mitchell Falls), K'gari (Fraser Island) and Tasmania.`,
            `Planning to see some of Australia yourself? See our [road trip suggestions](/faqs#roadTrips) for ideas beyond the wedding weekend.`,
          ],
        },
        chapterTwelve: {
          title: '2023 • The Jetlag Period',
          icon: 'ph:airplane-tilt',
          imageSrc: '/images/story/jetlag.webp',
          imageAlt: 'Somewhere in the air, 2023',
          overview: `A trip around the world.`,
          description: `Once international borders were open, we crammed in as much travel as we could before settling down.\n\n
          [Thailand](tooltip:thailand), [Laos](tooltip:laos), [Philippines](tooltip:philippines), [UK](tooltip:uk), [US](tooltip:us) and [Belgium](tooltip:belgium)...`,
          bullets: [
            `We started with a memorable Christmas reunion in Tucson, AZ with Nicole's Family (and [Jordy's Mum and Brother](tooltip:family)).`,
            `We drank our way across Belgium and caught up with friends in [Düsseldorf](tooltip:Can't lie - I don't really reccomend this city - more like **Tschüsseldorf**.), before kayaking with [wild Elephants](tooltip:A seriously special and breathtaking experience.) in Thailand.`,
            `Channeling our gap-year spirit, we explored South East Asia with Jordy's Dad and Jane. Topping off an unforgettable trip.`,
          ],
        },
        chapterThirteen: {
          title: 'Present Day • Melbourne',
          icon: 'ph:house',
          imageSrc: '/images/story/melbourne.webp',
          imageAlt: 'New Home, Melbourne, VIC, AU',
          overview: 'The crew — two dogs, one cat, and home at last.',
          description: `Trading in the van and [constant travel](/our-story#chapterEleven) for the burdens of paying rent and living a **more settled life** was definitely harder for Jordy than Nicole.
          But the benefits of **having a base** and forming **community** and **connections** have made this shift worthwhile.
          We are **loving our life** in Melbourne, and can't wait to share it with you all!`,
        },
        chapterFourteen: {
          title: 'April 2025 • Nepal',
          icon: 'ph:mountains',
          imageSrc: '/images/story/nepal.webp',
          imageAlt: 'The best yes, Himalayas, Nepal, April 2025',
          overview: 'Highest proposal on record, (likely this is not true)',
          description: `We reached **new heights** in more ways than one during our **Nepal** adventure. The proposal was **unforgettable**, and the memories we made will **last a lifetime**.`,
          bullets: [
            `Jordy got down on one knee at **5,106 metres above sea level** in the **Himalayas**.`,
            `18 days of hiking, freezing cold, and the easiest "yes" ever.`,
            `Though to be fair, Nicole was probably just **lightheaded** from the [lack of oxygen](https://www.youtube.com/watch?v=daV-tMnZeIw).`,
          ],
        },
      },
    },
  },

  // Wedding Details Section
  // NOTE: all other info on `WeddingDetails` is set by `event` and `ceremony`
  weddingDetails: {
    title: 'Wedding Weekend',
    emoji: '',
    intro: `Celebrate with us [at ${WEDDING.venue.name}](/venue) along the iconic Great Ocean Road.\n\n
    Will it be worth your effort and [hard-earned cash](https://www.youtube.com/watch?v=2aW7HweAf3o) to get here? We hope so.\n\n
    We are planning a three-day celebration with time to re-connect with friends and family from [around the globe](https://www.tfes.org/).\n\n
    [Get on the beers](https://www.youtube.com/watch?v=7hOK5JF5XGA).`,
    ctaText: 'Want to learn more about our event, or have questions?',
    ctaButton: 'Check out our FAQs',
  },

  // FAQ Section
  faq: {
    title: 'FAQ',
    emoji: '',
    intro:
      "We've put together some answers to questions we think you might have about the wedding weekend.\n\n More information will be added in due course here.",
    contact: {
      title: '',
      content: `Can't find the answer you're looking for? Drop us a line below.`,
      icon: undefined,
    },
    questionData: {
      general: {
        title: 'General Info - Dazed and Confused',
        icon: 'ph:info-bold',
        description: `If you're reading this - then you've likely got some questions.\n\n
        We hope a section below will answer them, but if not, please don't hesitate to [reach out to us directly](#contact).`,
        bullets: [
          `**Meals** Provided on site from [Friday evening](/wedding#friday) through [Sunday morning](/wedding#sunday).`,
          `**Weekend** The ceremony is on [Saturday](/wedding#saturday); stay for as much (or as little) of the weekend as you'd like!`,
          '**Parking** Free **on-site parking** for all guests. For information on getting to the venue see [Getting There](#transport) section.',
        ],
      },
      accommodation: {
        title: 'Accommodation - Where did you sleep last night?',
        icon: 'ph:house-bold',
        description: `We would love to have you **stay on site with us.**\n\n
        Seacroft offers a **range of accommodation options**, and we are sure we will be able to work something out.\n\n
        Message us for any questions. Contact details [below](#contact).`,
        bullets: [
          `**No charge:** to stay on site.`,
          `**Seacroft options:** See [their website](https://www.seacroft.com/) for ideas.`,
          `**Details:** Multiple options available: a **tree house**, **glamping tents**, and **private rooms** with shared facilities.`,
          `**I'm convinced:** If you would like to **stay on site**, please [indicate this](tooltip: So we can get an idea of numbers and preferences) in the [RSVP form](/rsvp).`,
          `**Priority:** given to international and interstate [guests](tooltip:Because we know travel is hard).`,
          `**Capacity:** We should have capacity to accommodate everyone that wants to stay on site.`,
          `**Alternatives:** There are also plenty of nearby options (see [below](#accommodationAlternatives)) if you'd prefer to stay [off-site](tooltip: Because we know you might be bougie).`,
        ],
      },
      dressCode: {
        title: 'Dress Code - Aussies wear thongs and those hats with corks right?',
        icon: 'ph:high-heel-bold',
        description: `Whilst Jordy **pretends** not to care what people wear; we would like to make our wedding feel special and **celebrate in style** with you all.`,
        bullets: [
          '[Ceremony & Reception](/wedding#saturday): Cocktail Attire.',
          `**Ceremony tip:** It's outdoors on grass — **NO stiletto heels**.`,
          `**Seriously:** **Stilettos** are a no go. Requested by the venue - to protect the floors and grounds.`,
          `**Rest of the weekend:** Casual — wear what you're **comfortable** in.`,
          '**Slip Slop Slap:** See [weather section below](#weather): [Sun protection](https://www.cancer.org.au/cancer-information/causes-and-prevention/sun-safety/campaigns-and-events/slip-slop-slap-seek-slide) for general outdoor comfort is a good idea.',
          `**Unpredictable Weather:** [Victorian](tooltip: Internationals: Victora is the state you'll be in for our wedding) weather is famously sporadic. Pack **layers** and prepare for **potential rain** regardless of the forecast.`,
        ],
      },
      weather: {
        title: 'Weather - Four Seasons in One Day',
        icon: 'ph:cloud-sun-bold',
        description: `If you've read the above section on [dress code](#dressCode) you'll have got the general idea here.\n\n
        [Expect](tooltip: We are not weather gods, so f*ck knows what will actually be happening!) mild Autumnal weather with (hopefully) warm afternoons.`,
        bullets: [
          `**Weather:** It will likely be **warm** (high 20s°C / [low-80s°F](tooltip: For those who can't quite grasp the metric system yet)), but **coastal winds can pick up**`,
          `**International Guests:** Our wedding is taking place in **March**, which is the beginning of **Autumn in Australia**.`,
          `**Expert tip:** Australia is **NOT** [always sunny](tooltip: It's not Philadelphia).`,
          `**UK and European Guests:** a similarity could be drawn to a [British summer](tooltip: Hopefully with less rain), Coastal Portugal, or a mild day in Northern Spain.`,
          `**USA Guests:** a similarity could be drawn to San Francisco's or Seattle's weather.`,
          '**In case of downpours:** Umbrellas/raincoats recommended (fingers crossed no freak storms!).',
          `**Overall:** think Four seasons in one day - and [pack accordingly](#packing).`,
        ],
      },
      kids: {
        title: 'Kids - Control yourself take only what you need from it',
        icon: 'ph:baby-carriage-bold',
        description: `We want families to be able to celebrate together - if they [want to](tooltip: We also understand you might want some time away from your little ones!).\n\n
        We don't want to exclude anyone who wants to attend from being able to do so.\n\n
        Whilst we are not planning any child-friendly activities, children are more then welcome to attend.\n\n
        **Parents** Please consider the below points and feel free to [reach out to us](#contact) if you want to **discuss specific needs**.\n\n
        `,
        bullets: [
          '**Childcare:** We have **no childcare arrangements planned** and are not planning on providing any **at this stage**.',
          `**Parents:** Please let us know if you're planning on bringing your little ones please **reach out to us directly**.`,
          '**Venue:** There is a bunch of space for kids to run around and explore, but **no specific kid-friendly activities** planned at this stage.',
          `**Disclaimer:** There will be **unattended alcohol** at the wedding, we are not responsible for any parents who choose to [get on the beers](https://www.youtube.com/watch?v=7hOK5JF5XGA) and **lose track of their kids**.`,
        ],
      },
      plusOne: {
        title: 'Plus Ones - Come Together',
        icon: 'ph:hand-heart-bold',
        description: `Your partner, spouse or significant other is likely **included in your invitation**.\n\n
        If we have **missed somone**, or you'd like **additional guests**, please [ask us](#contact) directly.\n\n`,
        bullets: [
          `**Extras:** If you're bringing **anyone not included in your invitation** (kids, polycule members, friends etc) please **ask us first** before including them on your [RSVP](/rsvp) response.`,
          `**RSVP:** You can [RSVP](/rsvp) once for your party - or as individual attendees. However is **easiest for you**.`,
        ],
      },
      packing: {
        title: 'Packing - All You Need Is Love',
        icon: 'ph:backpack-bold',
        description: `Think coastal comfort!`,
        bullets: [
          '**What Clothes Should I bring?** See [dress code](#dressCode) and [weather](#weather) above.',
          '**Most Importantly:** Bring **layers**, **sun** and **rain** protection and **suitable shoes**.',
          `**What Not to Bring:** Stilettos, linen (all provided), items banned by Australian [Bio-security](tooltip: You've seen nothing to declare, right?!).`,
          `**Other Essentials:** Below is a list of things I should not have to write for functioning adults:`,
          `**Visa:** Don't forget to check if you need a **Visa for Australia**.`,
          `**Passport:** [No shit](tooltip: only if youre coming from overseas, obviously) - but seriously make sure it has 6 months validity from the date you'll enter.`,
          `**Other Essentials:** toiletries and your **sense of adventure**!`,
        ],
      },
      transport: {
        title: 'Getting There - Traveling in a fried-out Kombi',
        icon: 'ph:car-bold',
        description: `[Seacroft Estate](https://www.seacroft.com/) is on the **Great Ocean Road**, roughly **2 hours from Melbourne**.\n\n
        Fair warning: this is a [scenic but remote location](tooltip:Which is kind of the point — we wanted somewhere beautiful). You will need a car, or at minimum a plan that involves one.\n\n
        We are looking at the option of hiring a bus (to and from Melbourne) and providing a shuttle service to make it easier for everyone.\n\n`,
        bullets: [
          `**International Guests:** The nearest International airport is Melbourne (MEL), however if you're flying from other Australian airports, eg Perth then Avalon (AVV) is also an option which can come up cheap.`,
          `**By Car:** The most practical option. [Directions from Melbourne](https://www.google.com/maps/dir/Melbourne,+Victoria/Seacroft+Estate,+4990+Great+Ocean+Rd,+Sugarloaf+VIC+3234/). Please also consider **carpooling** or **shuttle** option (more details to follow).`,
          `**Rental Car:** **Recommended** for **international guests** — gives you the **freedom** and **ability** to explore **at your own pace** before or after the [wedding](/wedding#saturday). There are lots of [trips](/faqs#thingsToDo) around and on the way to the venue.`,
          `**Carpooling:** Strongly encouraged — Good for the **wallet**, good for the **planet**, good for the **pre-drinks**. More information to be provided soon. We are more than happy to make connections and help to **facilitate options** here.`,
          `**Need a Ride?** If you'd rather hitch a ride with one of our **Melbourne based guests** who is planning on driving, indicate this in your [RSVP](/rsvp) we'll help **connect** people travelling from **overseas** to somone local who may be driving up.`,
          `**Shuttle:** We are exploring the option of providing **shuttle from a Melbourne meetup point**. [Details TBA](tooltip:We promise we haven't forgotten about this — it's on the list) closer to the date.`,
          `**Uber/Taxi:** [Technically possible](tooltip:If you enjoy burning money and watching it slowly disappear into the horizon), but the fare from Melbourne will be significant. Not recommended.`,
          `**Public Transport:** Takes about **an hour longer** than with a car. **Train to Geelong** followed by a **Coach to Apollo Bay** where we will be able to collect you or sort a lift. Example [PT route](https://maps.app.goo.gl/RipiLy5EopZP45Zk8).`,
          `**Parking:** Free **on-site parking** is available.`,
        ],
      },
      gifts: {
        title: 'Gifts - Cheap Thrills',
        icon: 'ph:gift-bold',
        description: `Your presence is the greatest gift!`,
        bullets: [
          '**Seriously:** some of you are travelling across the globe to be here.',
          `You **really don't** need to bring us anything.`,
        ],
      },
      accommodationAlternatives: {
        title: 'Accommodation Alternatives - Hotel California',
        icon: 'ph:bed-bold',
        description: `Whilst we would love to have you stay on site (see [Accommodation](#accommodation) section)\n\n
        We understand that [some people](tooltip:Bougie ones) might prefer to stay off-site.`,
        bullets: [
          `**Examples:** see 
          [airbnb](https://www.airbnb.com.au/s/Sugarloaf--VIC/homes?checkin=2027-03-19&checkout=2027-03-21)
          and
          [Booking.com](https://www.booking.com/searchresults.html?ss=Sugarloaf%2C+Victoria%2C+Australia&dest_id=900060432&dest_type=city&checkin=2027-03-19&checkout=2027-03-21&group_adults=2&no_rooms=1&group_children=0).`,
          `**Tip:** Above links already [pre-filled](tooltip: Helpful, right!) with our wedding dates and area.`,
          `**Note:** There is not so much [within walking distance](tooltip: Australia is a big place!), so if you're international you'll likely want to rent a car to get around.`,
        ],
      },
      thingsToDo: {
        title: 'Things to Do - Found God in a Tomato',
        icon: 'ph:map-pin-area-bold',
        description: `Whilst coming to our wedding you'll be on on one of **Australia's most iconic coastal drives**.\n\n
        If you're planning to make a road-trip or take some time before/after our wedding. Below are some suggestions of nearby areas to explore.\n\n
        For those who have more time and are looking for larger Australian adventures - check out our [road trip suggestions](#roadTrips) for ideas beyond the [wedding weekend](/wedding).`,
        bullets: [
          `[Great Ocean Road](https://visitgreatoceanroad.org.au/things-to-do/): General Great Ocean Road tips on that link, [this blog](https://www.beatthebucketlist.com/blog/great-ocean-road) - as well as all others below.`,
          `**General Tip:** All timings below are stated **from** the venue assuming a **car**. Anything **east** of the venue is **towards Melbourne** and will likly be **on your way**; anything **west** is **further away** and will likely require a **detour** or more time.`,
          `[Twelve Apostles](https://www.parks.vic.gov.au/places-to-see/parks/port-campbell-national-park/things-to-do/twelve-apostles): Iconic limestone [stacks](tooltip:There aren't 12 left!) rising from the Southern Ocean. Best at sunrise or sunset. About **1.5hrs west** of the venue.`,
          `[Lorne](https://www.visitvictoria.com/regions/great-ocean-road/destinations/lorne): The closest "proper" town **~30 mins east**. Good for coffee, exploring and [Erskine Falls](https://www.visitgreatoceanroad.org.au/things-to-do/erskine-falls/) — a lovely waterfall walk.`,
          `[Apollo Bay](https://www.visitmelbourne.com/regions/great-ocean-road/destinations/apollo-bay): The closest small town **~15 mins west**. Relaxed coastal vibes.`,
          `[Koalas at Kennett River](https://www.greatoceanroadaustralia.org/the-kennett-river-koala-walk/): Real ones, in the actual wild. On the way between **Lorne** and the **venue**. [Highly recommend](tooltip:They are surprisingly good at staying perfectly still and ignoring you).`,
          `[Great Otway National Park](https://www.parks.vic.gov.au/places-to-see/parks/great-otway-national-park): Temperate rainforest, waterfalls, and hiking trails. Appropx **30 mins** drive **east and inland**.`,
          `[Split Point Lighthouse](https://greatoceanroadmelbournetours.com.au/attractions/split-point-lighthouse/): Aireys Inlet **~1 hour east**. Scenic, photogenic, and free to walk around.`,
          `**Beach Walks**: Multiple beaches within walking distance of the venue. Swimming is [at your own risk](tooltip:This is the Southern Ocean. It is cold. It is wild. It does not care about you.).`,
          `**Planning a longer trip?** Check our [Aussie road trip suggestions](#roadTrips) for ideas beyond the wedding weekend.`,
        ],
      },
      roadTrips: {
        title: 'Aussie Road Trips - On a Hippie Trail, Head Full of Zombie',
        icon: 'ph:map-trifold-bold',
        description: `If you've flown halfway around the world, chances are that you may want to see some of it.\n\n
        Australia is [genuinely enormous](tooltip:About the same size as the contiguous USA — or 32 times the size of the UK. Yes really.) and every region feels completely different. We've [driven a fair bit of it ourselves](/our-story#chapterEleven), so feel free to [reach out directly](#contact) for personal favorites.\n\n
        Suggestions are roughly ordered from closest to the venue to furthest afield.\n\n
        **NOTE:** All trip timings are highly approximated (from the venue) and are stated **as the crow flies**. Likely each route will take you **slightly longer** and will depend on how many **stops and detours** you want to make.\n\n
        Each of the below plans also assumes **you'll have a car** and be **driving** (as this makes stopping and exploring much easier). If you have **less time**, or **don't want** to our **can't drive**, but **are keen** on a trip - reach out to us! We can suggest **public-transport** and or **day-trip** friendly options near Melbourne or **further afield**.`,
        bullets: [
          `**Great Ocean Road → Adelaide** ([~12 hour scenic drive](https://maps.app.goo.gl/oqoLNKyZCvtyC9MC8)):
          Head west past [Port Fairy](https://www.visitmelbourne.com/regions/great-ocean-road/destinations/port-fairy),
          whale-watching at [Warrnambool](https://www.warrnambool.vic.gov.au/whale-watching)
          (and [remember the time](tooltip:Seriously, watch the film Oddball) they used [sheepdogs to protect Penguins](https://www.warrnamboolpenguins.com.au/))
          and the stunning [Grampians](https://www.visitgrampians.com.au/).
          Adelaide has [world-class wine](https://www.barossa.com/) on the doorstep, an **excellent food scene**, and is [wildly underrated](tooltip:Adelaideans know this. Everyone else is slowly catching on).`,
          `**Melbourne → Sydney** ([~16hr coastal drive](https://maps.app.goo.gl/pNX1Rmy2GaZBCb869)):
          Drive via [Phillip Island](https://www.visitphillipisland.com/) for the [Penguin Parade](https://www.penguins.org.au/attractions/penguin-parade/)
          and [Wilsons Promontory](https://www.parks.vic.gov.au/places-to-see/parks/wilsons-promontory-national-park) — for **Wombats** and the **southernmost point** of mainland Australia.
          The NSW south coast is stunning and [largely undiscovered](tooltip:By tourists. The locals know).
          Sydney's [famous sights](tooltip:But we all know - Melbourne is better than Sydney.) **live up to the hype**.`,
          `**Tasmania** (**fly to Hobart**, ~1hr from Melbourne) or get the **ferry** (~12 hour boat from Geelong - overnight recommended):
          Wildly underrated, [intentionally kept quiet](tooltip:Tasmanians would like it to stay that way) by those in the know.
          [MONA](https://mona.net.au/) in Hobart is one of the world's **genuinely great** art museums.
          [Cradle Mountain](https://www.parks.tas.gov.au/explore-our-parks/cradle-mountain) is **otherworldly**.
          [Wineglass Bay](https://www.discovertasmania.com.au/regions/east-coast/wineglass-bay/) is as **breathtaking** as the photos suggest.
          [Delilah made it there](/our-story#chapterEleven) — so can you. Tassie is possible without a car (Hobart and surronds).
          But to really get out there and see the best of it a car would make your life [easier](tooltip:The same point is true about basically every trip on this list actually!).`,
          `**Western Australia** (fly Perth, ~4hr from MEL).
          Or if you have a lot of time and you feel like a **BIG** trip - consider driving the [44 hour](https://maps.app.goo.gl/ExcMhdVRj1LFLdW88) trip across the [Nullabor](tooltip:The longest straight road in the world.).
          You're probably better off using that time to drive up the [west coast](https://maps.app.goo.gl/wwtn16CJaKwhyhTN9).
          The most [criminally undervisited](tooltip:It's two time zones from Sydney. Most Australians haven't been due to how hard it is to get to from other states.)
          part of the country. [Wadjemup/Rottnest Island](https://www.rottnestisland.com/) for [quokkas](https://www.youtube.com/shorts/y47Qvl5pjLQ),
          [Margaret River](https://www.margaretriver.com/) for wine and surf, and [Exmouth and Ningaloo Reef](https://weareexplorers.co/camping-exmouth/) for snorkelling with whale sharks from March to July.
          We [drove the WA coast ourselves](/our-story#chapterEleven) and can vouch for it entirely.
          Due to the **sheer scale** of exploring all of these areas - this is likely best suited to those with **slightly more time**.
          The drive from **Perth** to **Exmouth** is [13 hours](https://maps.app.goo.gl/wwtn16CJaKwhyhTN9) not including the stops you'll want to make along the way.`,
          `**The Red Centre — Uluru and Kata Tjuta** (fly Alice Springs, ~3hr from Melbourne).
          Or as above take a [larger ~24hr drive](https://maps.app.goo.gl/ytE5FdmtVgLCzuYB7) and extend the Adelaide adventure above.
          One of the most striking landscapes on earth. If coming from Adelaide, stop through [Coober Pedy](https://www.cooberpedy.com/) — an underground opal-mining town (seriously they live like **mole-people**)
          built below the surface to escape [50-degree summers](tooltip:Australians built a whole town underground rather than deal with the temperature. Completely surreal.).`,
          `**Queensland East Coast** (fly Brisbane or Cairns, ~2.5hr). Where you're best off flying too depends on what you want to see:
          [Noosa](https://www.visitnoosa.com.au/), Airlie Beach for Whitsundays sailing,
          and Cairns as the gateway to the [Great Barrier Reef](https://www.gbrmpa.gov.au/) and Daintree Rainforest.
          Cairns and [FNQ](tooltip:Far North Queensland) is one of the only areas in the world where [two UNESCO](https://www.oakshotels.com/en/blogs/two-world-heritage-listed-natural-wonders-from-one-idyllic-vantage-point)
          **world heritage sites touch**. Stunning. Jordy worked as a [dive instructor](https://www.youtube.com/watch?v=QsF5ZLNDXzU) here during [our van life era](/our-story#chapterEleven) and we spent a fair amount of time around Cairns
          and in Queensland in general.`,
          `**Want Help Planning?** If you're interested in **exploring Australia** beyond the wedding weekend and **want some** [help](https://youtu.be/4QIZE708gJ4?t=19) planning your trip,
          feel free to [reach out to us directly](#contact) and we'd be happy to share more **personal recommendations** and tips!
          We are **by no means experts**, but we have **seen** a fair bit of the country **we now call home**. We would be able to help **suss out a trip** that fits with your time, budget, travel style and interests.`,
        ],
      },
      contact: {
        title: 'Still Got Questions? Ask',
        icon: 'ph:question-bold',
        description: `If you have any remaining questions about the wedding weekend, feel free to reach out to us.`,
        bullets: [
          '**Read:** this FAQ section first.',
          '**Your Question:** Might be **answered here**.',
        ],
      },
    },
  },

  // Venue Section
  venue: {
    title: WEDDING.venue.name,
    emoji: '',
    intro: WEDDING.venue.description,

    features: {
      accommodation: {
        icon: 'ph:house',
        title: 'Accommodation',
        description: `If you would like to stay on site, let us know in the [RSVP section](/rsvp).\n\n
          There are many private rooms and glamping tents available on-site with shared facilities.\n\n
          We hope to be able to accommodate everyone that wants to stay. (Priority given to international and overseas guests).\n\n
          There are options nearby if you would rather stay off-site (check our [FAQs](/faqs#accommodationAlternatives)).\n\n
          Meals and drinks included (Friday through Sunday).`,
      },
      views: {
        icon: 'ph:waves',
        title: 'Scenic Views',
        description: `Austrlia, what a place.
        [Fairy bread](https://en.wikipedia.org/wiki/Fairy_bread),
        [snags](https://www.youtube.com/shorts/msDPgJRwYEA) and
        [drop bears](https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Dropbear.jpg/500px-Dropbear.jpg).
        But wait, there's more!\n\n
        Enter at your own risk (criminal past no longer required).\n\n
        But seriously, the views from this place are why we chose to get married here.\n\n
        Breathtaking ocean views from the main lawn and many photo worthy lookouts across the property.\n\n
        Perfect for your morning [Magic](https://www.reddit.com/r/melbourne/comments/b3ybju/what_is_the_magic_coffee_and_can_i_get_it_anywhere/),
        [arvo](tooltip:slang) [VB](https://www.urbandictionary.com/define.php?term=VB)
        and late night [Amyl](https://www.youtube.com/watch?v=jCxgUPFVFkA).`,
      },
      beach: {
        icon: 'ph:tree-palm',
        title: 'Beach',
        description: `
        [Bondi Rescue](https://www.youtube.com/shorts/wXZaFmKyNT0),
        [Irukandji](https://www.youtube.com/shorts/IirqhqrUyJc),
        [Great Whites](https://www.youtube.com/watch?v=Do4oEokariY)
        and the [Blue-Ringed Octopus](https://www.youtube.com/shorts/WIgkzrFqI2U).
        You may have heard of all of these beach related Australian activities.\n\n
        [The beach](https://maps.app.goo.gl/v2YAyvG4RLCTmsJr5) at Seacroft is beautiful
        and only a short walk from the venue through the
        [Snake](https://www.youtube.com/watch?v=l8LpwjzQf3M)
        and Highland Cow infested fields.\n\n
        In all seriousness though, the beach here is very safe and absolutely stunning (although the water will be cold).`,
      },
      grounds: {
        icon: 'ph:cow',
        title: 'Beautiful Grounds',
        description: `Yes, there are [highland cows](https://www.youtube.com/shorts/-CsOiiKyf7c)
        here (unsure why), but they sure are coo-t. In addition to these non-native animals,
        there are many iconic endemic species that you may see.\n\n
        Along the Great Ocean Road. You may see
        [Roos](https://www.youtube.com/watch?v=bfEWCDRqpK4),
        [Koalas](https://www.youtube.com/shorts/r6nRSwPy0Hk) and
        [Echidnas](https://www.youtube.com/shorts/QHKvYR91W8w).
        If you've hit your 30s and become a
        [bird-nerd](https://www.youtube.com/watch?v=HivhKv7wA-w)
        (or you always were a bit of an [Ornithologist](https://www.youtube.com/watch?v=zl-wAqplQAo))
        there are some amazingly unique Australian birds here.\n\n
        As well as the stunning wildlife there is also a
        [quick 1km walk](https://maps.app.goo.gl/yJdRfTf2Tgyx37HC9?g_st=aw)
        to a local waterfall. For more information on nearby things to do see our [FAQs](/faqs#thingsToDo).`,
      },
    },

    ctaText: 'Want to learn more about this amazing venue?',
    ctaButton: `Explore ${WEDDING.venue.name}`,
    faqText: 'Got further questions about the venue or logistics?',
    faqButton: `See our FAQs`,
  },

  // RSVP Section
  rsvp: {
    title: 'RSVP',
    emoji: '',
    intro: `We'd love to know if you can join us!\n\n
      On the below form - if you're unsure - either try your best (or reach out).\n\n
      We understand how hard it can be to confirm plans when travelling internationally/\n\n
      None of these answers are set in stone.\n\n
      Please try to RSVP (and keep us in the loop) as soon as you know.`,

    form: {
      name: {
        label: 'Your Name',
        placeholder: 'Enter your full name',
        firstNameLabel: 'First Name',
        firstNamePlaceholder: 'First name',
        lastNameLabel: 'Last Name',
        lastNamePlaceholder: 'Last name',
      },
      email: {
        label: 'Email Address',
        placeholder: 'your@email.com',
      },
      attending: {
        label: 'Will you be attending?',
        hint: `Or at least plan to for now! We understand this is a big commitment — especially for those travelling internationally. Plans change and that's totally okay, just keep us in the loop.`,
        yes: "Yes, I'll be there! 🎉",
        no: "Sorry, can't make it 😢",
        placeholder: 'Do you want to come...',
        errorRequired: 'Please select whether you are attending before submitting.',
      },
      travelPlans: {
        label: 'How are you thinking of getting to the venue?',
        hint: 'Select all that (may) apply — no commitment needed, plans can change!',
        errorRequired: 'Please select at least one travel option before submitting.',
        options: [
          { value: 'own-car', label: 'Driving (own car)', icon: 'ph:car-bold' },
          { value: 'hire-car', label: 'Hiring / renting a car', icon: 'ph:key-bold' },
          { value: 'shuttle', label: 'Interested in shuttle from Melbourne', icon: 'ph:bus-bold' },
          { value: 'carpool', label: 'Open to carpooling', icon: 'ph:users-three-bold' },
          {
            value: 'public-transport',
            label: 'Public transport (train + coach)',
            icon: 'ph:train-bold',
          },
          { value: 'not-sure', label: 'Not sure yet / TBD', icon: 'ph:question-bold' },
        ],
      },
      selectYesNoQuestions: [
        {
          key: 'fridayEveningBbq',
          label: 'Will you be there Friday evening for BBQ?',
          hint: 'Highly encouraged if you can swing it — casual BBQ to kick off the weekend! (Vego and Vegan options will be provided).',
          yesIcon: 'ph:fork-knife',
          noIcon: 'ph:leaf',
          yes: 'Yes; BBQ, bby',
          no: `Nah; Level 5 vegan`,
          placeholder: 'Keen for a BBQ?',
          errorRequired: 'Please answer this question before submitting.',
          triggerId: 'friday-evening-bbq-trigger',
        },
        {
          key: 'sundayRecoveryBreakfast',
          label: 'Sunday morning for recovery brekkie?',
          hint: `Helps us plan catering — let us know if you'll stick around Sunday morning before heading off.`,
          yesIcon: 'ph:beer-stein',
          noIcon: 'ph:x',
          yes: 'Yes; Get on it!',
          no: `Nah; Boycott brek.`,
          placeholder: `The most important meal of the day`,
          errorRequired: 'Please answer this question before submitting.',
          triggerId: 'sunday-recovery-breakfast-trigger',
        },
        {
          key: 'stayingOnSite',
          label: 'Will you be staying on site? (No cost to you)',
          hint: 'On-site rooms and glamping tents are available at no cost. Highly recommended! Priority given to international and interstate guests.',
          yesIcon: 'ph:island',
          noIcon: 'ph:house',
          yes: `Yes; Beach!`,
          no: `Nah; Bougie b*tch!`,
          placeholder: 'Wanna stay with us',
          errorRequired: 'Please answer this question before submitting.',
          triggerId: 'staying-on-site-trigger',
        },
      ],
      guests: {
        label: 'Number of Guests (including yourself)',
        hint: `Unsure about plus-ones not on your invitation? Set 1 for now and let us know via the message field or reach out directly — we'll do our best to accommodate.`,
        description: 'Including yourself',
        additionalNamesLabel: 'Additional Guest Full Name(s)',
        additionalNamePlaceholderPrefix: 'Guest',
        additionalNamesRequired: 'Please add the full name for each additional guest.',
      },
      phone: {
        label: 'Phone Number',
        hint: 'Include country code for international numbers — e.g. +61 (AU) · +1 (US) · +44 (UK).',
        placeholder: '+61 4XX XXX XXX (AU) · +1 XXX XXX XXXX (US) · +44 XXX XXX XXXX (UK).',
        error: 'Please enter a valid mobile number with country code (e.g., +61 4XX XXX XXX)',
        errorRequired: 'Please enter a valid mobile number before submitting',
      },
      dietary: {
        label: 'Dietary Requirements or Allergies?',
        placeholder:
          'Let us know if you have any dietary needs or allergies we should be aware of 🌱🥩',
      },
      message: {
        label: 'Message for the Couple',
        placeholder: 'Share your excitement, request a song, or leave us a note...',
      },
      submit: 'Send RSVP',
      submitting: 'Sending...',
    },

    success: {
      title: 'RSVP Received!',
      attending:
        "🎊 Thank you! We're so excited to celebrate with you. You'll receive a confirmation email shortly.",
      notAttending:
        "😢 Thank you for letting us know. We'll miss celebrating with you in person and really appreciate your RSVP.",
    },

    error: {
      title: 'Oops!',
      message: '❌ Something went wrong. Please try again or contact us directly.',
      timeout:
        '❌ Request timed out. Please check your internet connection and try again, or contact us directly.',
      submitFailed: '❌ Oops! Something went wrong. Please try again or contact us directly.',
    },

    contact: {
      title: 'Need Help?',
      description:
        "If you have trouble with the form, feel free to email or text us and we'll add your details manually.",
      bride: `👰 ${WEDDING.couple.bride}`,
      groom: `🤵 ${WEDDING.couple.groom}`,
    },
  },

  // Login/Passcode Page
  login: {
    eyebrow: 'are getting married!',
    welcome: `We're so excited to celebrate with you at \n\n${WEDDING.venue.displayShort}\n\n·\n\nEnter the passcode from your invitation.`,
    privacy: 'This keeps our special day a little more private',
    placeholder: 'Enter passcode',
    submit: 'Enter Site ✨',
    submitting: 'Verifying...',

    errors: {
      incorrect:
        "Hmm, that code doesn't look quite right.\n\nCheck your invitation RSVP card; (password is case-sensitive)\n\nPlease try again.",
      connection: 'Connection error. Please try again.',
      tooManyRequests: 'You have tried too many times.\n\nPlease wait a bit and try again.',
    },
  },
} as const;
