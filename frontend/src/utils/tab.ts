import dayjs from "dayjs";
import { computed } from "vue";
import { v1 as uuidv1 } from "uuid";
import { t } from "../plugins/i18n";
import { Connection, DEFAULT_PROJECT_ID, TabInfo, UNKNOWN_ID } from "@/types";

export const defaultTabName = computed(() => t("sql-editor.untitled-sheet"));

export const emptyConnection = (): Connection => {
  return {
    projectId: DEFAULT_PROJECT_ID,
    instanceId: UNKNOWN_ID,
    databaseId: UNKNOWN_ID,
    tableId: UNKNOWN_ID,
  };
};

export const getDefaultTab = (): TabInfo => {
  return {
    id: uuidv1(),
    name: defaultTabName.value,
    connection: emptyConnection(),
    isSaved: true,
    savedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    statement: "",
    selectedStatement: "",
  };
};

export const INITIAL_TAB = getDefaultTab();
