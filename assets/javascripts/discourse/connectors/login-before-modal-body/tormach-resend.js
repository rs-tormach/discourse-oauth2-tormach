import Component from "@ember/component";
import { action } from "@ember/object";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";

export default class ResendConfirmLoginModal extends Component
{
  email = null;
  username = null;
  renderOk = false;

  getCookieValue(name) 
  {
    const regex = new RegExp(`(^| )${name}=([^;]+)`);
    const match = document.cookie.match(regex);
    if (match) {
      return match[2];
    }
  }

  get wavingHandURL() {
    return wavingHandURL();
  }

  @action
  sendActivationEmail() {
    const resendButton = document.querySelector('.resend-activation-button');
    resendButton.disabled = true;
    resendActivationEmail(this.get('username')).then(() => {
      const notActivated = document.getElementById('not-activated');
      notActivated.className += ' hidden';
      const sentActivation = document.getElementById('sent-activation');
      sentActivation.className = '';
    });
  }

  init() {
    super.init(...arguments);
    const e = this.getCookieValue("_oa2e");
    this.set('email', window.atob(e.replace('%0A', '')));
    const u = this.getCookieValue("_oa2u");
    this.set('username', window.atob(u.replace('%0A', '')));
  }

  didRender() {
    super.didRender(...arguments);
    const modalBodyLefts = document.querySelectorAll('.login-left-side');
    modalBodyLefts.forEach((modalBodyLeft) => {
      if (modalBodyLeft.id != "tormach-resend") {
        modalBodyLeft.className += ' hidden';
      }
    });
    const modalBodyRight = document.querySelector('.login-right-side');
    modalBodyRight.className += ' hidden';
    const modalAlert = document.querySelector('.alert.alert-error');
    modalAlert.className += ' hidden';
  }
}
