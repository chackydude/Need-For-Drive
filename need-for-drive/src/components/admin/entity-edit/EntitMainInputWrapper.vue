<template>
  <div class="content-items__main main-edit-items">
    <div class="main-edit-items__content">
      <h2 class="main-edit-items__title">{{ title }}</h2>
      <div class="main-edit-items__items">
        <!--        <TextField-->
        <!--          label-name="Модель автомобиля"-->
        <!--          type="text"-->
        <!--          placehoder="Hyndai, i30N"-->
        <!--          :modeling-value="{ name: 'name', value: car.name }"-->
        <!--        />-->
        <slot>
          <!--inputs-->
        </slot>
      </div>
    </div>

    <slot name="message" class="message">
      <!--message-->
    </slot>

    <div class="main-edit-items__buttons edit-result-buttons">
      <div class="edit-result-buttons__save-cancel-button">
        <button class="edit-result-buttons__save-button" @click="emitPost">
          Сохранить
        </button>
        <button class="edit-result-buttons__new-button" @click="emitNew" v-if="isCreatable">
          Новый
        </button>
        <button class="edit-result-buttons__cancel-button" @click="emitCancel">
          Отмена
        </button>
      </div>
      <button class="edit-result-buttons__delete-button" @click="emitDelete">
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
// import ArrayField from "./edit-types/ArrayField";

export default {
  name: "EntityDefaultInputs",
  components: {
    // TextField,
    // ArrayField
  },
  props: {
    car: Object,
    title: String,
    isCreatable: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    emitPost() {
      this.$emit("post");
    },
    emitCancel() {
      this.$emit("cancel");
    },
    emitDelete() {
      this.$emit("delete");
    },
    emitNew() {
      this.$emit("new");
    }
  }
};
</script>

<style lang="scss">
@import "public/css/mixins";
@import "public/css/variables";

.main-edit-items {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-edit-items__title {
  color: $admin-text-dark;
}

.content-items__main {
  background-color: #fff;
  box-shadow: 0 0 5px rgba(38, 46, 52, 0.2);
  border-radius: 10px;
  padding: 23px;
  width: 100%;
}

.main-edit-items__items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.edit-item {
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 70px;
  justify-content: flex-end;
  margin-right: 20px;

  label {
    font-size: 12px;
    margin-bottom: 5px;
  }

  input {
    height: 30px;
    font-size: 15px;
    padding: 10px;
    border-radius: 4px;
    border: 1px darken($admin-light-gray, 20) solid;
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      width: 30px;
      border: 1px darken($admin-light-gray, 20) solid;
      color: darken($admin-light-gray, 20);
      background-color: #fff;
      cursor: pointer;
      border-radius: 4px;
      justify-self: flex-end;
      margin-left: 10px;
      @include buttonStyles;
    }
  }
}

.edit-item--error {
  border: 2px lighten($admin-error, 30) solid !important;
  box-shadow: 0 0 3px rgba(38, 46, 52, 0.2);
}

.main-edit-items__colors {
  margin-top: 15px;

  div {
    margin-top: 8px;
  }
}

.main-edit-items__buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 23px;

  .edit-result-buttons__save-button,
  .edit-result-buttons__cancel-button,
  .edit-result-buttons__new-button,
  .edit-result-buttons__delete-button {
    width: 100px;
    height: 29px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    @include buttonStyles;
  }

  .edit-result-buttons__save-button {
    color: #fff;
    background-color: $admin-blue-color;
  }

  .edit-result-buttons__cancel-button,
  .edit-result-buttons__new-button {
    color: $admin-text-dark;
    background-color: $admin-light-gray;
    margin-left: 8px;
  }

  .edit-result-buttons__delete-button {
    color: #fff;
    background-color: $admin-error;
  }
}

.message {
  margin: auto;
}

@media (max-width: 1200px) {
  .main-edit-items__buttons {
    align-items: flex-end;

    .edit-result-buttons__cancel-button,
    .edit-result-buttons__new-button,
    .edit-result-buttons__save-button {
      margin: 10px 0 0 0;
    }
  }

  .edit-result-buttons__save-cancel-button {
    display: flex;
    flex-direction: column-reverse !important;
  }
}

@media (max-width: 900px) {
  .admin-content__title {
    text-align: center;
  }

  .admin-content__items {
    flex-direction: column;
    align-items: center;
  }

  .input-file-item {
    margin: auto 0 20px 0 !important;
    max-width: 100%;
    width: 100%;
  }

  .main-edit-items__buttons {
    align-items: flex-end;

    .edit-result-buttons__cancel-button {
      margin: 10px 0 0 0;
    }
  }

  .edit-result-buttons__save-cancel-button {
    display: flex;
    flex-direction: column;
  }
}
</style>
