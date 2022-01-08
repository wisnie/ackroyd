// alias: APOD - Astronomy Picture of the Day
const createFigure = ({ title, url, copyright }) => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.src = url;
    img.alt = title;
    figcaption.textContent = `${title} by ${copyright}`;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    return figure;
};

const getAPOD = async (retries = 3) => {
    try {
        const APOD_QUERY =
            'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
        const request = await fetch(APOD_QUERY);
        const data = await request.json();
        return data;
    } catch (e) {
        if (retries > 0) return getAPOD(--retries);
        else throw e;
    }
};

const index = async () => {
    const section = document.querySelector('.gallery');
    // display toast with information about the error instead
    const apod = await getAPOD();
    const figure = createFigure(apod);

    section.appendChild(figure);
};

index();
