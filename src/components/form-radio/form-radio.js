import idMixin from '../../mixins/id'
import formMixin from '../../mixins/form'
import formStateMixin from '../../mixins/form-state'
import formSizeMixin from '../../mixins/form-size'
import formRadioCheckMixin from '../../mixins/form-radio-check'
import looseEqual from '../../utils/loose-equal'

// @vue/component
export default {
  name: 'BFormRadio',
  mixins: [
    idMixin,
    formRadioCheckMixin, // includes shared render function
    formMixin,
    formSizeMixin,
    formStateMixin
  ],
  inject: {
    bvGroup: {
      from: 'bvRadioGroup',
      default: function() {
        return this
      }
    }
  },
  props: {
    checked: {
      // v-model
      type: [String, Object, Number, Boolean],
      default: null
    }
  },
  computed: {
    // Radio Groups can only have a single value, so determining if checked is simple
    is_Checked() {
      return looseEqual(this.value, this.computedLocalChecked)
    },
    is_Radio() {
      return true
    },
    is_Check() {
      return false
    }
  },
  watch: {
    // Radio Groups can only have a single value, so our watchers are simple
    computedLocalChecked(newVal, oldVal) {
      this.$emit('input', this.computedLocalChecked)
    }
  },
  methods: {
    handleChange({ target: { checked } }) {
      const value = this.value
      this.computedLocalChecked = value
      // Change is only emitted on user interaction
      this.$emit('change', checked ? value : null)
      // If this is a child of form-radio-group, we emit a change event on it as well
      if (this.is_Group) {
        this.bvGroup.$emit('change', checked ? value : null)
      }
    }
  }
}
