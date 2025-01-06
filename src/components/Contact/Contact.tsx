import { FormEvent, useRef } from "react";

import "./Contact.scss";

export default function Contact() {
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (!formRef.current) {
			return;
		}

		const formData = new FormData(formRef.current);

		const formObject: { [key: string]: string } = {};

		formData.forEach((value, key) => {
			formObject[key] = value.toString();
		});

		const fullMsg = `Nom : ${formObject.lastname}%0D%0APrénom : ${formObject.firstname}%0D%0AEmail : ${formObject.email}%0D%0A--------------------%0D%0A%0D%0A${formObject.message}`;

		window.open(`mailto:${FORM_CONFIG.__FORM_EMAIL__}?cc=${formObject.email}&subject=${FORM_CONFIG.__FORM_SUBJECT__}&body=${fullMsg}`);

		// Clear inputs
		// formRef.current.reset();
	};

	return (
		<section id="contact">
			<div className="banner">
				<h2 className="title secondary">Contact</h2>

				<div className="column">
					<p>N'hésitez pas à me contacter !</p>

					<form id="contact-form" ref={formRef} onSubmit={handleSubmit}>
						<div id="input-container">
							<div className="row-input">
								<input type="text" name="lastname" id="lastname" placeholder="Nom" required />
								<input type="text" name="firstname" id="firstname" placeholder="Prénom" required />
							</div>

							<input type="email" name="email" id="email" placeholder="Votre email" required />

							<textarea name="message" id="message" placeholder="Message" required></textarea>
						</div>

						<button className="btn" type="submit">
							Envoyer
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
