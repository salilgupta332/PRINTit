export const adminSidebarMenu = [
  {
    label: "Dashboard",
    icon: "📊",
    path: "/",
    exact: true,
  },
  {
    label: "Assignments",
    icon: "📄",
    children: [
      {
        label: "All Assignments",
        path: "/assignments",
      },
      {
        label: "Manage Assignments",
        path: "/assignments/manage",
      },
      {
        label: "Archived",
        path: "/assignments/archived",
      },
    ],
  },
];
