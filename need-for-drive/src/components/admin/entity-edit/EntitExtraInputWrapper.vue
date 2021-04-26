<template>
  <div class="type-input-editor">
    <img
      v-if="car.thumbnail.path === undefined && getCarImagePath === ''"
      src="@/assets/images/admin/unknown-car.jpg"
      alt="car-image"
      class="car-item__image type-input-editor__image"
      ref="carImage"
    />

    <img
      v-else
      alt="car-image"
      class="car-item__image type-input-editor__image"
      ref="carImage"
      :src="imgSource"
      crossOrigin="anonymous"
      referrerPolicy="origin"
    />

    <p class="type-input-editor__name">{{ car.name }}</p>
    <div class="type-input-editor__image-input">
      <label for="car-image">{{ file ? file.name : "Выберите файл..." }}</label>
      <input
        type="file"
        class="type-input-editor__input-file"
        ref="imageInput"
        id="car-image"
        accept="image/*"
        @change="handleFileUpload"
      />
      <button @click="$refs.imageInput.click()">Обзор</button>
    </div>

    <div class="type-input-editor__progress">
      <div class="progress-status">
        <p>Заполнено:</p>
        <p>{{ progress }}%</p>
      </div>
      <progress-bar :val="progress" :max="total" :bar-border-radius="2" />
    </div>

    <div class="type-input-editor__description">
      <p class="type-input-editor__title">Описание</p>
      <textarea
        class="type-input-editor__text"
        name="description"
        placeholder="Description..."
        v-model="car.description"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "EntityFileInput",
  props: {
    progress: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 100
    },
    car: Object
  },
  data() {
    return {
      file: null
    };
  },
  methods: {
    ...mapMutations(["updateCarFile", "updateCarImagePath"]),
    handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log(this.file);
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function() {
          this.$refs.carImage.src = reader.result;
          this.updateCarImagePath(reader.result);
        }.bind(this),
        false
      );

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
          this.updateCarImagePath("");
          this.updateCarFile(this.file);
        }
      }
    }
  },
  computed: {
    ...mapGetters(["getLastCar", "getCarImagePath", "getCar "]),
    imgSource() {
      if (this.getCarImagePath !== "") {
        return this.getCarImagePath;
      } else {
        return (
          "https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/" +
          this.car.thumbnail.path
        );
      }
    }
  }
};
</script>

<style lang="scss">
@import "public/css/variables";
@import "public/css/mixins";

.type-input-editor {
  background-color: #fff;
  border-radius: 10px;
  padding: 35px 23px 23px 23px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 5px rgba(38, 46, 52, 0.2);
  align-items: center;
  min-width: 300px;
  max-width: 334px;
  width: auto;
  min-height: 500px;
}

.type-input-editor__image {
  max-height: 90px;
}

.type-input-editor__name {
  font-size: 24px;
  color: $admin-text-dark;
  margin-top: 10px;
}

.type-input-editor__type {
  font-size: 13px;
  color: $admin-text-light;
  margin-top: 10px;
}

.type-input-editor__image-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 29px;
  width: 70%;
  border: 1px $gray-light-color solid;
  border-radius: 6px;
  padding: 0 0 0 10px;
  margin-top: 10px;

  .type-input-editor__input-file {
    display: none;
  }

  button {
    border-radius: 0 5px 5px 0;
    border: none;
    font-size: 10px;
    height: 100%;
    min-width: 60px;
    @include buttonStyles;
    cursor: pointer;
  }

  label {
    font-size: 10px;
  }
}

.progress-status {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  color: $admin-text-light;

  margin-bottom: 6px;
}

.type-input-editor__progress {
  margin-top: 10px;
  min-height: 60px;
  width: 100%;
  border-top: 1px $admin-light-gray solid;
  border-bottom: 1px $admin-light-gray solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.type-input-editor__description {
  font-size: 14px;
  color: $admin-text-gray;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.type-input-editor__title {
  color: $admin-text-light;
  margin-top: 10px;
}

.type-input-editor__text {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  flex-grow: 1;
  resize: none;
  border-radius: 6px;
  border: 1px darken($admin-light-gray, 20) solid;
}

@media (max-width: 600px) {
  .type-input-editor__image-input {
    button {
      height: 30px;
    }
  }
}
</style>
