import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Navdata = () => {
    const history = useHistory();
    //state data
    const [isVin, setIsVin] = useState(false);
    const [isSourcing, setIsSourcing] = useState(false);
    const [isInspection, setIsInspection] = useState(false);
    const [isArgus, setIsArgus] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState === 'Users') {
            history.push("/users");
        }
        if (iscurrentState === 'Dashboard') {
            history.push("/dashboard");
        }
        if (iscurrentState !== 'Vin') {
            setIsVin(false);
        }
        if (iscurrentState !== 'Sourcing') {
            setIsSourcing(false);
        }
        if (iscurrentState !== 'Inspection') {
            setIsInspection(false);
        }
        if (iscurrentState !== 'Argus') {
            setIsArgus(false);
        }
    }, [
        history,
        iscurrentState,
        isVin,
        isSourcing,
        isInspection,
        isArgus,
    ]);

    const menuItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "las la-tachometer-alt",
            link: "/dashboard",
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Dashboard');
            },
        },
        {
            id: "vin",
            label: "VIN",
            icon: "lab la-delicious",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsVin(!isVin);
                setIscurrentState('Vin');
                updateIconSidebar(e);
            },
            stateVariables: isVin,
            subItems: [
                {
                    id: "create",
                    label: "Ajouter",
                    link: "/vin-create",
                    parentId: "vin",
                },
                {
                    id: "list",
                    label: "Liste",
                    link: "/vin-list",
                    parentId: "vin",
                },
            ],
        },
        {
            id: "sourcing",
            label: "Sourcing",
            icon: "las la-car",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsSourcing(!isSourcing);
                setIscurrentState('Sourcing');
                updateIconSidebar(e);
            },
            stateVariables: isSourcing,
            subItems: [
                {
                    id: "create",
                    label: "Ajouter",
                    link: "/sourcing-create",
                    parentId: "sourcing",
                },
                {
                    id: "list",
                    label: "Liste",
                    link: "/sourcing-list",
                    parentId: "sourcing",
                },
            ],
        },
        {
            id: "inspection",
            label: "Inspection",
            icon: "las la-book",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsInspection(!isInspection);
                setIscurrentState('Inspection');
                updateIconSidebar(e);
            },
            stateVariables: isInspection,
            subItems: [
                {
                    id: "create",
                    label: "Ajouter",
                    link: "/inspection-create",
                    parentId: "inspection",
                },
                {
                    id: "list",
                    label: "Liste",
                    link: "/inspection-list",
                    parentId: "inspection",
                },
            ],
        },
        {
            id: "argus",
            label: "Argus",
            icon: "las la-kaaba",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsArgus(!isArgus);
                setIscurrentState('Argus');
                updateIconSidebar(e);
            },
            stateVariables: isArgus,
            subItems: [
                {
                    id: "quoting",
                    label: "Cotation",
                    link: "/argus-quoting",
                    parentId: "argus",
                },
            ],
        },
        {
            id: "users",
            label: "Utilisateurs",
            icon: "las la-users",
            link: "/users",
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Users');
            },
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;