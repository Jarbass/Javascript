export default function initTooltip() {

    const tooltips = document.querySelectorAll("[data-tooltip]");

    tooltips.forEach((item) => {
        item.addEventListener("mouseover", onMouseOver);
    });

    const onMouseLeave = {
        handleEvent() { //TEM QUE SER EXATAMENTE O NOME handleEvent
            this.tooltipBox.remove();
            this.element.removeEventListener("mouseleave", onMouseLeave);
        }
    }

    const onMouseMove = {
        handleEvent(event) {
            this.tooltipBox.style.top = event.pageY + 20 + "px";
            this.tooltipBox.style.left = event.pageX + 20 + "px";
            this.element.removeEventListener("mousemove", onMouseMove);
        }
    }

    function onMouseOver(event) {
        const tooltipBox = criarTooltipBox(this);

        onMouseLeave.tooltipBox = tooltipBox;
        onMouseLeave.element = this;
        this.addEventListener("mouseleave", onMouseLeave);

        onMouseMove.tooltipBox = tooltipBox;
        this.addEventListener("mousemove", onMouseMove);
    }

    function criarTooltipBox(element) {
        const tooltipBox = document.createElement("div");
        const text = element.getAttribute("aria-label");

        tooltipBox.classList.add("tooltip");
        tooltipBox.innerText = text;

        document.body.appendChild(tooltipBox);

        return tooltipBox;
    }
}