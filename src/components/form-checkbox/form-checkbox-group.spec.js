import Group from './form-checkbox-group'
// import Input from './form-checkbox'
import { mount } from '@vue/test-utils'

describe('form-checkbox-group', async () => {
  /* Structure, class and attributes tests */

  it('default has structure <div></div>', async () => {
    const wrapper = mount(Group)
    expect(wrapper).toBeDefined()
    expect(wrapper.is('div')).toBe(true)
    const children = wrapper.element.children
    expect(children.length).toEqual(0)
  })

  it('default has no classes on wrapper', async () => {
    const wrapper = mount(Group)
    expect(wrapper.classes().length).toEqual(0)
  })

  it('default has auto ID set', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true
    })
    await wrapper.vm.$nextTick()
    // Auto ID not generated until after mount
    expect(wrapper.attributes('id')).toBeDefined()
  })

  it('default has tabindex set to -1', async () => {
    const wrapper = mount(Group)
    expect(wrapper.attributes('tabindex')).toBeDefined()
    expect(wrapper.attributes('tabindex')).toBe('-1')
  })

  it('default does not have aria-required set', async () => {
    const wrapper = mount(Group)
    expect(wrapper.attributes('aria-required')).not.toBeDefined()
  })

  it('default does not have aria-invalid set', async () => {
    const wrapper = mount(Group)
    expect(wrapper.attributes('aria-invalid')).not.toBeDefined()
  })

  it('default has attribute role=group', async () => {
    const wrapper = mount(Group)
    expect(wrapper.attributes('role')).toBeDefined()
    expect(wrapper.attributes('role')).toBe('group')
  })

  it('default has user provided ID', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        id: 'test'
      }
    })
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toBe('test')
  })

  it('default has class was-validated when validated=true', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        validated: true
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes()).toContain('was-validated')
  })

  it('default has attribute aria-invalid=true when state=false', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        state: false
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeDefined()
    expect(wrapper.attributes('aria-invalid')).toBe('true')
  })

  it('default does not have attribute aria-invalid when state=true', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        state: true
      }
    })
    expect(wrapper.attributes('aria-invalid')).not.toBeDefined()
  })

  it('default does not have attribute aria-invalid when state=null', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        state: null
      }
    })
    expect(wrapper.attributes('aria-invalid')).not.toBeDefined()
  })

  it('default has attribute aria-invalid=true when aria-invalid=true', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        ariaInvalid: true
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeDefined()
    expect(wrapper.attributes('aria-invalid')).toBe('true')
  })

  it('default has attribute aria-invalid=true when aria-invalid="true"', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        ariaInvalid: 'true'
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeDefined()
    expect(wrapper.attributes('aria-invalid')).toBe('true')
  })

  it('default has attribute aria-invalid=true when aria-invalid=""', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        ariaInvalid: ''
      }
    })
    expect(wrapper.attributes('aria-invalid')).toBeDefined()
    expect(wrapper.attributes('aria-invalid')).toBe('true')
  })

  /* button mode structure */

  it('button mode has classes button-group and button-group-toggle', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        buttons: true
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('btn-group-toggle')
  })

  it('button mode has classes button-group-vertical and button-group-toggle when stacked=true', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        buttons: true,
        stacked: true
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.classes()).toContain('btn-group-vertical')
    expect(wrapper.classes()).toContain('btn-group-toggle')
  })

  it('button mode has size class when size prop set', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        buttons: true,
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('btn-group-toggle')
    expect(wrapper.classes()).toContain('btn-group-lg')
  })

  it('button mode has size class when size prop set and stacked', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        buttons: true,
        stacked: true,
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toBeDefined()
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.classes()).toContain('btn-group-vertical')
    expect(wrapper.classes()).toContain('btn-group-toggle')
    expect(wrapper.classes()).toContain('btn-group-lg')
  })

  /* functionality testing */

  it('has checkboxes via options array', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        options: ['one', 'two', 'three'],
        checked: []
      }
    })
    expect(wrapper.classes()).toBeDefined()
    const checks = wrapper.findAll('input')
    expect(checks.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual([])
    expect(checks.is('input[type=checkbox]')).toBe(true)
  })

  it('has checkboxes via options array which respect disabled', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        options: [{ text: 'one' }, { text: 'two' }, { text: 'three', disabled: true }],
        checked: []
      }
    })
    expect(wrapper.classes()).toBeDefined()
    const checks = wrapper.findAll('input')
    expect(checks.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual([])
    expect(checks.is('input[type=checkbox]')).toBe(true)
    expect(checks.at(0).attributes('disabled')).not.toBeDefined()
    expect(checks.at(1).attributes('disabled')).not.toBeDefined()
    expect(checks.at(2).attributes('disabled')).toBeDefined()
  })

  it('emits change event when checkbox clicked', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        options: ['one', 'two', 'three'],
        checked: []
      }
    })
    expect(wrapper.classes()).toBeDefined()
    const checks = wrapper.findAll('input')
    expect(checks.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual([])

    checks.at(0).trigger('click')
    expect(wrapper.vm.localChecked).toEqual(['one'])
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0][0]).toEqual(['one'])
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(['one'])

    checks.at(2).trigger('click')
    expect(wrapper.vm.localChecked).toEqual(['one', 'three'])
    expect(wrapper.emitted('change').length).toBe(2)
    expect(wrapper.emitted('change')[1][0]).toEqual(['one', 'three'])
    expect(wrapper.emitted('input').length).toBe(2)
    expect(wrapper.emitted('input')[1][0]).toEqual(['one', 'three'])

    checks.at(0).trigger('click')
    expect(wrapper.vm.localChecked).toEqual(['three'])
    expect(wrapper.emitted('change').length).toBe(3)
    expect(wrapper.emitted('change')[2][0]).toEqual(['three'])
    expect(wrapper.emitted('input').length).toBe(3)
    expect(wrapper.emitted('input')[2][0]).toEqual(['three'])

    checks.at(1).trigger('click')
    expect(wrapper.vm.localChecked).toEqual(['three', 'two'])
    expect(wrapper.emitted('change').length).toBe(4)
    expect(wrapper.emitted('change')[3][0]).toEqual(['three', 'two'])
    expect(wrapper.emitted('input').length).toBe(4)
    expect(wrapper.emitted('input')[3][0]).toEqual(['three', 'two'])
  })

  it('checkboxes reflect group checked v-model', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        options: ['one', 'two', 'three'],
        checked: ['two']
      }
    })
    expect(wrapper.classes()).toBeDefined()
    const checks = wrapper.findAll('input')
    expect(checks.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual(['two'])
    expect(checks.is('input[type=checkbox]')).toBe(true)
    expect(checks.at(0).element.checked).toBe(false)
    expect(checks.at(1).element.checked).toBe(true)
    expect(checks.at(2).element.checked).toBe(false)

    wrapper.setProps({
      checked: ['three', 'one']
    })

    expect(wrapper.vm.localChecked).toEqual(['three', 'one'])
    expect(checks.is('input[type=checkbox]')).toBe(true)
    expect(checks.at(0).element.checked).toBe(true)
    expect(checks.at(1).element.checked).toBe(false)
    expect(checks.at(2).element.checked).toBe(true)
  })

  it('child checkboxes have is-valid classes when group state set to valid', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        options: ['one', 'two', 'three'],
        checked: [],
        state: true
      }
    })
    expect(wrapper.classes()).toBeDefined()
    const checks = wrapper.findAll('input')
    expect(checks.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual([])
    expect(checks.is('input[type=checkbox]')).toBe(true)
    expect(checks.is('input.is-valid')).toBe(true)
  })

  it('child checkboxes have is-invalid classes when group state set to invalid', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        options: ['one', 'two', 'three'],
        checked: [],
        state: false
      }
    })
    const checks = wrapper.findAll('input')
    expect(checks.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual([])
    expect(checks.is('input[type=checkbox]')).toBe(true)
    expect(checks.is('input.is-invalid')).toBe(true)
  })

  it('child checkboxes have disabled attribute when group disabled', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        options: ['one', 'two', 'three'],
        checked: [],
        disabled: true
      }
    })
    const checks = wrapper.findAll('input')
    expect(checks.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual([])
    expect(checks.is('input[type=checkbox]')).toBe(true)
    expect(checks.is('input[disabled]')).toBe(true)
  })

  it('child checkboxes have required attribute when group required', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        name: 'group',
        options: ['one', 'two', 'three'],
        checked: [],
        disabled: true
      }
    })
    const checks = wrapper.findAll('input')
    expect(checks.length).toBe(3)
    expect(wrapper.vm.localChecked).toEqual([])
    expect(checks.is('input[type=checkbox]')).toBe(true)
    expect(checks.is('input[disabled]')).toBe(true)
  })

  it('child checkboxes have class custom-control-inline when stacked=false', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        name: 'group',
        options: ['one', 'two', 'three'],
        checked: [],
        stacked: false
      }
    })
    const checks = wrapper.findAll('.custom-control')
    expect(checks.length).toBe(3)
    expect(checks.is('div.custom-control-inline')).toBe(true)
  })

  it('child checkboxes do not have class custom-control-inline when stacked=true', async () => {
    const wrapper = mount(Group, {
      attachToDocument: true,
      propsData: {
        name: 'group',
        options: ['one', 'two', 'three'],
        checked: [],
        stacked: true
      }
    })
    const checks = wrapper.findAll('.custom-control')
    expect(checks.length).toBe(3)
    expect(checks.is('div.custom-control-inline')).toBe(false)
  })
})
