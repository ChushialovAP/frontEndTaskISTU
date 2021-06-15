let tabs = document.querySelectorAll('.tab')
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        let activeTab = document.querySelector('.active');
        if (activeTab) activeTab.classList.remove('active');

        tab.classList.add('active')
    });
});

function changeContent(e, content) {
    var tabContent = document.querySelectorAll('.tab-content');
    tabContent.forEach(content => {
        content.style.display = "none";
    });

    document.getElementById(content).style.display = "block";
}