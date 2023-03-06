import HelloWorld from "@/components/HelloWorld.vue";
import Table from "./components/Table.vue";
import Table2 from "./components/Table2.vue";
import RelationP from "./components/RelationP.vue";

export const routes = [
  { path: "/", component: HelloWorld },
  { path: "/table", component: Table },
  { path: "/table2", component: Table2 },
  { path: "/relation", component: RelationP },
];
