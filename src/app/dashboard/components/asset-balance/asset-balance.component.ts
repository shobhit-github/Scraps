import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnInit, HostListener,
} from '@angular/core';
import {IPortfolio} from 'src/app/portfolio/interfaces/portfolio';

@Component({
    selector: 'app-asset-balance',
    templateUrl: './asset-balance.component.html',
    styleUrls: ['./asset-balance.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetBalanceComponent implements OnInit {
    @Input() public assetBalance: IPortfolio;
    public innerWidth: number;

    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
    }

    @HostListener('window:resize')
    onResize() {
        this.innerWidth = window.innerWidth;
    }
}
