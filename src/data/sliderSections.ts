// Sample slider section data
export const favouritesSection = {
  name: "favourites_section",
  heading: "Favourites You’ll Come Back For",
  section_color: "#5C823D",
  show_arrows: true,
  button: {
    text: "VIEW ALL RECIPES",
    action: "view_recipes"
  },
  blocks: [
    {
      block_image: new URL('../assets/images/gallery/Rectangle 31.svg', import.meta.url).href,
      block_heading: "CHICKEN TIKKA ",
      block_description: "Corn-fed chicken, yoghurt-marinated with paprika and fenugreek, clay-roasted."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 32.svg', import.meta.url).href,
      block_heading: "BUTTER CHICKEN ",
      block_description: "Clay-grilled chicken in tomato butter sauce with clove and cardamom."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 33.svg', import.meta.url).href,
      block_heading: "BUTTER CHICKEN ",
      block_description: "Clay-grilled chicken in tomato butter sauce with clove and cardamom."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 34.svg', import.meta.url).href,
      block_heading: "BUTTER CHICKEN ",
      block_description: "Clay-grilled chicken in tomato butter sauce with clove and cardamom."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 36.svg', import.meta.url).href,
      block_heading: "BUTTER CHICKEN ",
      block_description: "Clay-grilled chicken in tomato butter sauce with clove and cardamom."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 37.svg', import.meta.url).href,
      block_heading: "BUTTER CHICKEN ",
      block_description: "Clay-grilled chicken in tomato butter sauce with clove and cardamom."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 31.svg', import.meta.url).href,
      block_heading: "BUTTER CHICKEN ",
      block_description: "Clay-grilled chicken in tomato butter sauce with clove and cardamom."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 32.svg', import.meta.url).href,
      block_heading: "MASALA CHAI ",
      block_description: "Black tea with cardamom, ginger and black peppercorns."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 33.svg', import.meta.url).href,
      block_heading: "DAL MAKHANI ",
      block_description: "Slow-cooked black lentils with butter, cream and aromatic spices."
    }
  ]
}

export const specialtiesSection = {
  name: "specialties_section",
  heading: "CHEF'S SPECIAL CREATIONS",
  section_color: "#D2691E",
  show_arrows: true,
  button: {
    text: "EXPLORE MENU",
    action: "view_menu"
  },
  blocks: [
    {
      block_image: new URL('../assets/images/gallery/Rectangle 34.svg', import.meta.url).href,
      block_heading: "HYDERABADI BIRYANI",
      block_description: "Fragrant basmati rice layered with tender lamb, saffron and fried onions."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 36.svg', import.meta.url).href,
      block_heading: "TANDOORI MIXED GRILL",
      block_description: "Assorted meats and vegetables cooked in our traditional clay oven."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 37.svg', import.meta.url).href,
      block_heading: "TANDOORI MIXED GRILL",
      block_description: "Assorted meats and vegetables cooked in our traditional clay oven."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 31.svg', import.meta.url).href,
      block_heading: "TANDOORI MIXED GRILL",
      block_description: "Assorted meats and vegetables cooked in our traditional clay oven."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 32.svg', import.meta.url).href,
      block_heading: "TANDOORI MIXED GRILL",
      block_description: "Assorted meats and vegetables cooked in our traditional clay oven."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 33.svg', import.meta.url).href,
      block_heading: "TANDOORI MIXED GRILL",
      block_description: "Assorted meats and vegetables cooked in our traditional clay oven."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 34.svg', import.meta.url).href,
      block_heading: "TANDOORI MIXED GRILL",
      block_description: "Assorted meats and vegetables cooked in our traditional clay oven."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 36.svg', import.meta.url).href,
      block_heading: "KERALA FISH CURRY",
      block_description: "Fresh catch of the day in coconut milk with curry leaves and mustard seeds."
    }
  ]
}

export const dessertsSection = {
  name: "desserts_section",
  heading: "SWEET ENDINGS",
  section_color: "#CD853F",
  show_arrows: false,
  button: {
    text: "ORDER DESSERTS",
    action: "order_desserts"
  },
  blocks: [
    {
      block_image: new URL('../assets/images/gallery/Rectangle 37.svg', import.meta.url).href,
      block_heading: "GULAB JAMUN",
      block_description: "Soft milk dumplings soaked in cardamom-scented syrup."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 31.svg', import.meta.url).href,
      block_heading: "GULAB JAMUN",
      block_description: "Soft milk dumplings soaked in cardamom-scented syrup."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 32.svg', import.meta.url).href,
      block_heading: "GULAB JAMUN",
      block_description: "Soft milk dumplings soaked in cardamom-scented syrup."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 33.svg', import.meta.url).href,
      block_heading: "GULAB JAMUN",
      block_description: "Soft milk dumplings soaked in cardamom-scented syrup."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 34.svg', import.meta.url).href,
      block_heading: "GULAB JAMUN",
      block_description: "Soft milk dumplings soaked in cardamom-scented syrup."
    },
    {
      block_image: new URL('../assets/images/gallery/Rectangle 36.svg', import.meta.url).href,
      block_heading: "MALAI KULFI",
      block_description: "Traditional Indian ice cream with pistachios and rose petals."
    }
  ]
}

// Export all sections as an array for easy iteration
export const allSliderSections = [
  favouritesSection,
  specialtiesSection, 
  dessertsSection
]
