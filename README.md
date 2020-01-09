This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



# jsramverk-project-client

[![Build Status](https://scrutinizer-ci.com/g/persla/jsramverk-project-client/badges/build.png?b=master)](https://scrutinizer-ci.com/g/persla/jsramverk-project-client/build-status/master)

## Use-cases som är testade med Selenium och Scrutinizer
Use-case 1: “Användaren kunna trycka på en länk för att hamna på Registreringssidan.”

Use-case 2: “Användaren ska kunna trycka på en länk för att hamna på Inloggningssidan.”

Use-case 3: “Användaren ska kunna trycka på en länk för att hamna på Homesidan.”

Use-case 4: “Användaren ska kunna trycka på en länk för att hamna på Utloggningssidan.”

Use-case 5: “Användaren ska kunna trycka på Home-länken för att sedermera hamna på Homesidan och bakgrundsfärgen för diven som innehåller aktuella värden hämtas.”

Use-case 6: “Ej inloggad användare ska kunna trycka på länken Konto och inte få tillgång till vyns innehåll.

Use-case 7: “Ej inloggad användare ska kunna trycka på länken Köp och inte få tillgång till vyns innehåll.

## Redovisning
För att skapa en klient för plattformen använde jag mig av JavaScript-biblioteket React. Motivet att använda React är dels att jag har arbetat med det under kursen och dels att det passar utmärkt att använda när det gäller realtidsapplikationer. För att implementera tradingplattsformens olika funktionaliteter skapade jag en spa struktur med sex olika vyer. En home vy som renderar ett realtids element i from av ett linjediagram som visualiserar de aktuella objekten på tradingplattformen. Detta diagram renderas med hjälp av npm paketet Chart.js med pluginen chartjs-plugin-streaming för att livestreama och visualisera data från Wiener-processen från socketservern. Därefter finns det en vy för vart och ett av 3 element som hanterar registrering, inloggning och utloggning på applikationen. Där har jag använt mig av formelement och jwt token för att autentisera användaren mot api:t som gör att de får access till hela plattformen.

För att kunna implementera momentet av handelsinteraktion skapade jag två vyer, en för att köpa och en för att sälja objekt. Bägge har liknande struktur med formelement, där aktuella köp och försäljningar postas för att läggas till i databasen. Jag använde även get request för att hämta aktuellt kontosaldo så att användaren inte kan övertrassera kontot vid köp(vid en eventuell övertrassering så disables köp-knappen och ett errormeddelande visas) och vid försäljning hämtade jag antalet aktuella objektandelar som användaren har i sin portfölj för att eliminera möjligheten att sälja fler objekt än vad som ägaren har i sin besittning(där använde jag mig också av button disable och ett errormedellande visas vid respektive övertrasserat objekt). För att kunna implementera denna validering så användes tenterary operator.

För att sedermera kunna hantera användarens konto och depå skapade jag en vy som jag kallade konto där användaren kan sätta in pengar, se kontosaldo och aktuella objektvärdena portföljen. Här använde jag mig av get request som filtrerades(filter()) och sedermera mappades(map()) beroende på vilken status objekten hade, false om det handlade enbart om antalet olika andelar(vilket hade som syfte att få en kontinuerlig kontroll över antalet aktuella andelar i portföljen), action när det gäller köp och försäljning(detta hade som syfte att kunna rendera en transaktionshistorik som samlar alla köp och försäljningar på plattformen i datumordning) och account när det gäller aktuellt kontosaldo(som ökades på vid insättning och försäljning av objekt och minskades vid köp). I denna vy fanns det också möjlighet att sätta in pengar på för att kunna handla med på plattformen via en post request till express och insättning av dokument i mongodb.

De För att sedermera göra denna applikation publik har en droplet på digitalocean skapats som används för att serva och göra den offentligt tillgänglig.
