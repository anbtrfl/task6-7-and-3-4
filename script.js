document.addEventListener('DOMContentLoaded', () => {
    const buttonProducts = document.querySelectorAll('.products input[type="radio"][id^="prod-"]');
    const buttonProfessional = document.querySelectorAll('.professional input[type="radio"][id^="professional-"]');

    function hideTables(tableMap, containerClass) {
        tableMap.forEach((id) => {
            const table = document.querySelector(`.${containerClass}${id}`);
            if (table) {
                table.style.display = 'none';
            }
        });
    }

    function showInitialTable(buttonId, tableMap, containerClass) {
        const button = document.getElementById(buttonId);
        if (button && button.checked) {
            const firstTable = document.querySelector(`.${containerClass}${tableMap.get(button.id)}`);
            if (firstTable) {
                firstTable.style.display = 'block';
            }
        }
    }

    function activateMenu(buttons, tableMap, containerClass) {
        buttons.forEach(button => {
            button.addEventListener('change', () => {
                tableMap.forEach((tableId, radioId) => {
                    const table = document.querySelector(`.${containerClass}${tableId}`);
                    if (button.id === radioId && button.checked) {
                        table.style.display = 'block';
                    } else {
                        table.style.display = 'none';
                    }
                });
            });
        });
    }
    function highlightSubheading(activeButton) {
        document.querySelectorAll('.product-container div, .professional-container div').forEach(item => {
            item.style.backgroundColor = '';
            item.style.color = '';
        });

        const activeElement = document.querySelector(`[data-id="${activeButton.id}"]`);
        if (activeElement) {
            activeElement.style.backgroundColor = 'black';
            activeElement.style.color = 'white';
        }
    }

    const tableProd = new Map([
        ['prod-1', '#Вычисления'],
        ['prod-2', '#Бизнес_приложения'],
        ['prod-3', '#Базы_данных'],
        ['prod-4', '#Кибербезопасность'],
        ['prod-5', '#Сеть_и_медиа'],
        ['prod-6', '#ИИ_облако']

    ]);

    const tableProfessional = new Map([
        ['professional-1', '#Консалтинг'],
        ['professional-2', '#Профессиональные'],
        ['professional-3', '#Выделенная']
    ]);

    hideTables(tableProd, 'product-container');
    hideTables(tableProfessional, 'professional-container');

    showInitialTable('prod-1', tableProd, 'product-container');
    showInitialTable('professional-1', tableProfessional, 'professional-container');

    activateMenu(buttonProducts, tableProd, 'product-container');
    activateMenu(buttonProfessional, tableProfessional, 'professional-container');

});


function toggleClass(element, className, condition) {
    if (element) {
        element.classList.toggle(className, condition);
    }
}


function createProxyHandler(map) {
    return {
        get(target, prop) {
            const value = target[prop];
            if (prop === 'set' && typeof value === 'function') {
                return function (key, newValue) {
                    value.call(target, key, newValue);
                    toggleClass(document.getElementById(`${key.id}_Wmenu`), 'active', newValue);
                };
            }
            return value.bind(target);
        }
    };
}

const navPoints = document.querySelectorAll('.navigation-point');
const pointsStates = new Map();
const proxiedButtonStates = new Proxy(pointsStates, createProxyHandler(pointsStates));

navPoints.forEach(button => proxiedButtonStates.set(button, false));
navPoints.forEach(button => {
    button.addEventListener('click', () => {
        navPoints.forEach(curButton => proxiedButtonStates.set(curButton, false));
        proxiedButtonStates.set(button, true);
    });
});
