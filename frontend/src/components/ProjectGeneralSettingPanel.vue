<template>
  <form class="max-w-md space-y-4">
    <p class="text-lg font-medium leading-7 text-main">
      {{ $t("common.general") }}
    </p>
    <div class="flex justify-between">
      <dl class="">
        <dt class="text-sm font-medium text-control-light">
          {{ $t("common.name") }} <span class="text-red-600">*</span>
        </dt>
        <dd class="mt-1 text-sm text-main">
          <input
            id="projectName"
            v-model="state.name"
            :disabled="!allowEdit"
            required
            autocomplete="off"
            type="text"
            class="textfield"
          />
        </dd>
      </dl>

      <dl class="">
        <dt class="text-sm font-medium text-control-light">
          {{ $t("common.key") }}
        </dt>
        <dd class="mt-1 text-sm text-main">
          <input
            id="projectKey"
            :value="project.key"
            disabled
            required
            autocomplete="off"
            type="text"
            class="textfield uppercase"
          />
        </dd>
      </dl>
    </div>

    <div v-if="isDev">
      <dl class="">
        <div class="textlabel">
          {{ $t("project.settings.schema-migration-type") }}
          <span class="text-red-600">*</span>
        </div>
        <BBSelect
          id="schemamigrationtype"
          :selected-item="state.schemaMigrationType"
          :item-list="['DDL', 'SDL']"
          class="mt-1"
          @select-item="
            (type: SchemaMigrationType) => {
              state.schemaMigrationType = type;
            }
          "
        >
          <template #menuItem="{ item }">
            {{
              $t(
                `project.settings.select-schema-migration-type-${item.toLowerCase()}`
              )
            }}
          </template>
        </BBSelect>
      </dl>
    </div>

    <div v-if="allowEdit" class="flex justify-end">
      <button
        type="button"
        class="btn-primary"
        :disabled="!allowSave"
        @click.prevent="save"
      >
        {{ $t("common.save") }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import isEmpty from "lodash-es/isEmpty";
import { computed, defineComponent, PropType, reactive } from "vue";
import { useI18n } from "vue-i18n";
import {
  DEFAULT_PROJECT_ID,
  Project,
  ProjectPatch,
  SchemaMigrationType,
} from "../types";
import { pushNotification, useProjectStore } from "@/store";

interface LocalState {
  name: string;
  schemaMigrationType: SchemaMigrationType;
}

export default defineComponent({
  name: "ProjectGeneralSettingPanel",
  props: {
    project: {
      required: true,
      type: Object as PropType<Project>,
    },
    allowEdit: {
      default: true,
      type: Boolean,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const projectStore = useProjectStore();

    const state = reactive<LocalState>({
      name: props.project.name,
      schemaMigrationType: props.project.schemaMigrationType,
    });

    const allowSave = computed((): boolean => {
      return (
        props.project.id != DEFAULT_PROJECT_ID &&
        !isEmpty(state.name) &&
        (state.name !== props.project.name ||
          state.schemaMigrationType != props.project.schemaMigrationType)
      );
    });

    const save = () => {
      const projectPatch: ProjectPatch = {};

      if (state.name !== props.project.name) {
        projectPatch.name = state.name;
      }
      if (state.schemaMigrationType !== props.project.schemaMigrationType) {
        projectPatch.schemaMigrationType = state.schemaMigrationType;
      }

      projectStore
        .patchProject({
          projectId: props.project.id,
          projectPatch,
        })
        .then((updatedProject: Project) => {
          pushNotification({
            module: "bytebase",
            style: "SUCCESS",
            title: t("project.settings.success-updated"),
          });
          state.name = updatedProject.name;
          state.schemaMigrationType = updatedProject.schemaMigrationType;
        });
    };

    return {
      state,
      allowSave,
      save,
    };
  },
});
</script>
