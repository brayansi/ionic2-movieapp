import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortText'
})

export class ShortTextPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        if (value) {
            return value.slice(0, args[0]) + '...';
        }
    }
}