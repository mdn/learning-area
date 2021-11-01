const tabs = document.querySelectorAll('.info-box li a');
const panels = document.querySelectorAll('.info-box article');

function setTabHandler(tabPos) {

    tabs[tabPos].onclick = () => {
        for (i = 0; i < tabs.length; i++) {
            tabs[i].className = '';
        }

        this.className = 'active';


        for (i = 0; i < panels.length; i++) {
            panels[i].className = '';
        }

        panels[tabPos].className = 'active-panel';
    }

}

for (i = 0; i < tabs.length; i++) {
    setTabHandler(i);
}