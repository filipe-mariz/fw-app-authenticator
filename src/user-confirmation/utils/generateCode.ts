export function gerarCodigo() {
	const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numeros = "0123456789";

	let codigo = "";

	for (let i = 0; i < 3; i++) {
		codigo += letras.charAt(Math.floor(Math.random() * letras.length));
	}

	for (let i = 0; i < 3; i++) {
		codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
	}

	return codigo;
}