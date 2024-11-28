// let apiData = null;

// async function apiAulas(aula) {
//     try {
//         const res = await fetch(`https://chatbot-ws-3ce88-default-rtdb.firebaseio.com/aulas/${aula}.json?key=AIzaSyCGu5fy0XiiV7WoPd2zudt7dLaXvYVzHYU`);
//         if (!res.ok) {
//             throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         apiData = await res.json(); // Guardar los datos en la variable global
//     } catch (error) {
//         console.error('Error al obtener los datos:', error);
//     }
// }
