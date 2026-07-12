import {
  allNoticesScrolled,
  elementNeedsVerticalScroll,
  hasNoticeFields,
  isElementScrolledToBottom,
  noticeFieldKeys,
} from './formulario-publico-term-scroll.util';
import { FormularioPublicoField } from '../../core/services/formulario-publico.service';

describe('formulario-publico-term-scroll.util', () => {
  const noticeField: FormularioPublicoField = {
    name_key: 'termo',
    label: 'Texto do termo',
    type: 'notice',
    required: false,
  };

  const textField: FormularioPublicoField = {
    name_key: 'nome',
    label: 'Nome',
    type: 'text',
    required: true,
  };

  it('detects notice fields', () => {
    expect(hasNoticeFields([textField])).toBeFalse();
    expect(hasNoticeFields([noticeField, textField])).toBeTrue();
    expect(noticeFieldKeys([noticeField, textField])).toEqual(['termo']);
  });

  it('tracks scroll completion for all notices', () => {
    expect(allNoticesScrolled(['a', 'b'], { a: true, b: true })).toBeTrue();
    expect(allNoticesScrolled(['a', 'b'], { a: true })).toBeFalse();
    expect(allNoticesScrolled([], {})).toBeTrue();
  });

  it('detects scroll position and overflow', () => {
    const el = {
      scrollTop: 100,
      clientHeight: 200,
      scrollHeight: 300,
    } as HTMLElement;

    expect(isElementScrolledToBottom(el)).toBeTrue();
    expect(isElementScrolledToBottom({ ...el, scrollTop: 0 } as HTMLElement)).toBeFalse();

    const shortEl = { scrollTop: 0, clientHeight: 200, scrollHeight: 200 } as HTMLElement;
    expect(elementNeedsVerticalScroll(shortEl)).toBeFalse();
    expect(elementNeedsVerticalScroll({ ...shortEl, scrollHeight: 260 } as HTMLElement)).toBeTrue();
  });
});
