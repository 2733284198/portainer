import { parseVariables } from '../utils';
export default class EnvironmentVariablesSimpleModeController {
  /* @ngInject */
  constructor($async) {
    this.$async = $async;
  }

  add() {
    this.onChange([...this.ngModel, { name: '', value: '' }]);
  }

  remove(index) {
    this.onChange(this.ngModel.filter((_, i) => i !== index));
  }

  removeValue(index) {
    this.onChange(this.ngModel.map((e, i) => (i === index ? { name: e.name } : e)));
  }

  hasValue(env) {
    return typeof env.value !== 'undefined';
  }

  addFromFile(file) {
    return this.$async(async () => {
      if (!file) {
        return;
      }
      const text = await this.getTextFromFile(file);
      const parsed = parseVariables(text);
      this.onChange(this.ngModel.concat(parsed));
    });
  }

  getTextFromFile(file) {
    return new Promise((resolve, reject) => {
      const temporaryFileReader = new FileReader();
      temporaryFileReader.readAsText(file);
      temporaryFileReader.onload = (event) => resolve(event.target.result);
      temporaryFileReader.onerror = (error) => reject(error);
    });
  }
}