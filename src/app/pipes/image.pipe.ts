import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform(img: string, tipo: 'usuarios' | 'hospitales' | 'medicos'): string {
    if (!img) {
      return `${base_url}/uploads/${tipo}/no-image`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${base_url}/uploads/${tipo}/${img}`;
    } else {
      return `${base_url}/uploads/${tipo}/no-image`;
    }
  }
}
