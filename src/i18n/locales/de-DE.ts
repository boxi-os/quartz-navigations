import type { Translation } from "../index";

const deDE: Translation = {
  nav: {
    label: "Hauptnavigation",
    toggleMenu: "Menü umschalten",
    closeMenu: "Menü schließen",
    home: "Start",
    overview: "Übersicht",
    previous: "Zurück",
    next: "Weiter",
    jumpTo: "Springe zu…",
    go: "Los",
    pager: "Vorherige und nächste Seite",
    expand: ({ title }) => `${title} aufklappen`,
  },
};

export default deDE;
