interface JQuery{
	tooltip(): void;
	popover(): void;
	magnificPopup(MagOptions): void;
	modal(
		setting?: string,
		options?: { [key: string]: string | undefined }
	): void;
}

class Index {
	init = (): void => {	
	}
}

const index = new Index();
index.init();