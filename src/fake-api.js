
const defaultAreas = [
    {
        id: 0,
        name: 'Receiving Point 1',
        priority: 1,
        weightRange: ['<1kg', '<2kg', '<5kg', '>5kg'],
        sizeRange: ['12" x 8" x 8"', '12" x 12" x 18"', '24" x 24" x 24"']
    },
    {
        id: 1,
        name: 'Receiving Point 2',
        priority: 2,
        weightRange: ['<1kg', '<2kg'],
        sizeRange: ['12" x 8" x 8"', '12" x 12" x 18"']
    }
];

const areas = [
]

const packages = [

]

window.onload = () => {
    const loadedAreas = JSON.parse(localStorage.getItem('areas'));
    if (loadedAreas.length > 0) {
        areas.push(...loadedAreas);
    } else {
        areas.push(...defaultAreas)
    }
    packages.push(...JSON.parse(localStorage.getItem('packages') || []));
}

window.onunload = () => {
    localStorage.setItem('areas', JSON.stringify(areas));
    localStorage.setItem('packages', JSON.stringify(packages));
}


// Needed to simulate a database call.
const wait = async (delay = 500) => new Promise((resolve, reject) => setTimeout(resolve, delay));

const getFittingArea = (pack) => {
    const fittingArea = [...areas]
        .sort((a, b) => b.priority - a.priority)
        .find((area) => area.weightRange.includes(pack.weight)
            && area.sizeRange.includes(pack.size));
    return fittingArea;
}

const get = async (path) => {
    console.log(path,/\/areas\/(\d+)/.test(path))
    switch (path) {
        case '/areas':
            await wait();
            return Promise.resolve([...areas]);
        case /\/areas\/(\d+)/.test(path) ? path : null:
            await wait();
            const id = +path.match(/\/areas\/(\d+)/)[1];
            const area = areas.find((area) => area.id === id)
            if (!area) return Promise.reject('Not found');
            const areaPackages = packages.filter((pack) => pack.area.id === id);
            return Promise.resolve({ ...area, packages: areaPackages });
        default:
            return Promise.reject('Not Found');
    }
}

const post = async (path, data) => {
    switch (path) {
        case '/packages':
            await wait();
            const area = getFittingArea(data);
            if (!area) {
                return Promise.reject('There is no area this package can be delivered to')
            }
            packages.push({ ...data, area });
            return Promise.resolve({ ...data, area });
        case '/areas':
            await wait();
            areas.push({ ...data, id: areas[areas.length - 1].id + 1 });
            return Promise.resolve({ ...data })
        default:
            return Promise.reject('Not Found');

    }
}

const fakeApi = {
    get,
    post,
};

export default fakeApi;
