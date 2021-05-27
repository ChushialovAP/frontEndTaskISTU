window.onload = myMain;

function myMain() {
    document.getElementById('tabs').onclick = changeContent;
}

function changeContent(e) {
    if (e.target.tagName = 'BUTTON') {
        if (e.target.id == 'tv') {
            document.getElementById('films-content').style.display = 'none';
            document.getElementById('tv-content').style.display = 'block';
        } else if (e.target.id == 'films') {
            document.getElementById('films-content').style.display = 'block';
            document.getElementById('tv-content').style.display = 'none';
        }
    }
}