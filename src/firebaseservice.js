// firebaseservice.js
export const getNewArrivals = async () => {
  try {
    const response = await fetch("https://api.jsonbin.io/v3/b/68bff75b43b1c97be93c2cc2", {
      headers: {
        "X-Master-Key":"$2a$10$Runh2ddM6g6LUCHKRi7ak.CRyO6xRTF/GHYi2ndS5jXxHY/wKRMXi",
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    // Ensure we have an array in json.record
    if (!Array.isArray(json.record)) {
      console.error("Expected an array but got:", json.record);
      return [];
    }

    // Filter new arrivals
    const newArrivals = json.record.filter(item => item.isNewArrival === true);

    return newArrivals;
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
};

