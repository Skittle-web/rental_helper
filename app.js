class RentalApp {
    constructor() {
        this.version = '1.0.0';
        
        // Проверяем, в Electron ли мы
        this.isElectron = typeof window !== 'undefined' && window.require;
        
        if (this.isElectron) {
            try {
                this.electron = window.require('electron');
                this.ipcRenderer = this.electron.ipcRenderer;
                this.remote = this.electron.remote;
                
                // Загружаем данные из Electron
                this.data = this.loadDataFromElectron();
                this.language = this.loadLanguageFromElectron();
            } catch (error) {
                console.error('Ошибка инициализации Electron:', error);
                this.isElectron = false;
                this.data = this.loadFromLocalStorage();
                this.language = localStorage.getItem('rental_language') || 'ru';
            }
        } else {
            // Браузерный режим
            this.data = this.loadFromLocalStorage();
            this.language = localStorage.getItem('rental_language') || 'ru';
        }
        
        this.selectedDates = [];
        this.currentEditingProperty = null;
        this.currentEditingGolfCart = null;
        this.currentEditingBooking = null;
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        
        // Поисковые запросы для каждой вкладки
        this.calendarSearchQuery = '';
        this.propertiesSearchQuery = '';
        this.golfCartsSearchQuery = '';
        this.bookingsSearchQuery = '';
        
        // Translations
        this.translations = {
            ru: {
                appTitle: 'Менеджер аренды',
                save: 'Сохранить',
                cancel: 'Отмена',
                delete: 'Удалить',
                edit: 'Редактировать',
                add: 'Добавить',
                close: 'Закрыть',
                loading: 'Загрузка...',
                confirmDelete: 'Вы уверены?',
                
                calendar: 'Календарь',
                properties: 'Жилье',
                golfCarts: 'Гольф-машины',
                bookings: 'Все брони',
                
                selectDates: 'Выберите даты...',
                checkAvailability: 'Показать свободные',
                clearSelection: 'Очистить',
                availableProperties: 'Свободное жилье:',
                availableGolfCarts: 'Свободные гольф-машины:',
                bookedProperties: 'Занятое жилье:',
                bookedGolfCarts: 'Занятые гольф-машины:',
                selectDatesHint: 'Выберите даты в календаре или в поле выше',
                selectedDates: 'Выбранные даты:',
                nights: 'ночей',
                days: 'дней',
                noAvailable: 'Нет свободных объектов на выбранные даты',
                noBooked: 'Нет занятых объектов на выбранные даты',
                bookThis: 'Забронировать',
                
                manageProperties: 'Управление жильем',
                manageGolfCarts: 'Управление гольф-машинами',
                addProperty: '+ Добавить жилье',
                addGolfCart: '+ Добавить гольф-машину',
                propertyName: 'Название:',
                propertyDescription: 'Описание:',
                propertyAddress: 'Адрес:',
                propertyColor: 'Цвет в календаре:',
                addPropertyTitle: 'Добавить жилье',
                editPropertyTitle: 'Редактировать жилье',
                propertyBookings: 'Бронирования:',
                noBookings: 'Нет бронирований',
                totalBookings: 'Всего:',
                upcomingBookings: 'Ближайшие бронирования:',
                noProperties: 'Жилье не добавлено',
                addPropertyHint: 'Нажмите "Добавить жилье" чтобы начать',
                
                golfCartName: 'Название/Модель:',
                golfCartOwner: 'Хозяин:',
                golfCartSeats: 'Количество мест:',
                golfCartDescription: 'Описание:',
                addGolfCartTitle: 'Добавить гольф-машину',
                editGolfCartTitle: 'Редактировать гольф-машину',
                noGolfCarts: 'Гольф-машины не добавлены',
                addGolfCartHint: 'Нажмите "Добавить гольф-машину" чтобы начать',
                seats: 'мест',
                owner: 'Хозяин',
                
                allBookings: 'Все бронирования',
                addBooking: '+ Новая бронь',
                bookingTitle: 'Новое бронирование',
                editBookingTitle: 'Редактировать бронирование',
                selectType: 'Тип:',
                selectProperty: 'Жилье:',
                selectGolfCart: 'Гольф-машина:',
                startDate: 'Дата начала:',
                endDate: 'Дата окончания:',
                guestName: 'Имя гостя:',
                guestPhone: 'Телефон:',
                notes: 'Примечания:',
                bookingPrice: 'Цена брони (₽):',
                deposit: 'Депозит (₽):',
                depositPaid: 'Депозит внесен',
                cancellationPolicy: 'Политика отмены:',
                freeCancellation: '🟢 Бесплатная отмена',
                paidCancellation: '🔴 Платная отмена',
                partialCancellation: '🟡 Частичная компенсация',
                nonRefundable: '⛔ Невозвратный тариф',
                freeCancelUntil: 'Срок бесплатной отмены:',
                deleteBooking: 'Удалить бронь',
                nightsCount: 'ночей',
                daysCount: 'дней',
                noPhone: 'Телефон не указан',
                noNotes: 'Без примечаний',
                unknownProperty: 'Неизвестное жилье',
                unknownGolfCart: 'Неизвестная машина',
                
                important: '❗ ОЧЕНЬ ВАЖНО',
                depositStatus: 'Депозит:',
                paid: 'Оплачен',
                notPaid: 'Не оплачен',
                importantDetails: 'Важная информация',
                noImportantText: 'Нет дополнительного описания',
                
                january: 'Январь',
                february: 'Февраль',
                march: 'Март',
                april: 'Апрель',
                may: 'Май',
                june: 'Июнь',
                july: 'Июль',
                august: 'Август',
                september: 'Сентябрь',
                october: 'Октябрь',
                november: 'Ноябрь',
                december: 'Декабрь',
                
                monday: 'Пн',
                tuesday: 'Вт',
                wednesday: 'Ср',
                thursday: 'Чт',
                friday: 'Пт',
                saturday: 'Сб',
                sunday: 'Вс',
                
                viewBookings: 'Брони',
                bookNow: 'Забронировать',
                viewAllBookings: 'Просмотр броней',
                deletePropertyConfirm: 'Удалить "{0}"? Все связанные бронирования также будут удалены.',
                deleteGolfCartConfirm: 'Удалить "{0}"? Все связанные бронирования также будут удалены.',
                deleteBookingConfirm: 'Удалить это бронирование?',
                bookedFor: 'Занято:',
                guest: 'Гость:',
                
                free: 'Бесплатная отмена',
                paid: 'Платная отмена',
                partial: 'Частичная компенсация',
                'non-refundable': 'Невозвратный тариф'
            },
            
            en: {
                appTitle: 'Rental Manager',
                save: 'Save',
                cancel: 'Cancel',
                delete: 'Delete',
                edit: 'Edit',
                add: 'Add',
                close: 'Close',
                loading: 'Loading...',
                confirmDelete: 'Are you sure?',
                
                calendar: 'Calendar',
                properties: 'Properties',
                golfCarts: 'Golf Carts',
                bookings: 'All Bookings',
                
                selectDates: 'Select dates...',
                checkAvailability: 'Show available',
                clearSelection: 'Clear',
                availableProperties: 'Available properties:',
                availableGolfCarts: 'Available golf carts:',
                bookedProperties: 'Booked properties:',
                bookedGolfCarts: 'Booked golf carts:',
                selectDatesHint: 'Select dates in calendar or in field above',
                selectedDates: 'Selected dates:',
                nights: 'nights',
                days: 'days',
                noAvailable: 'No available items for selected dates',
                noBooked: 'No booked items for selected dates',
                bookThis: 'Book this',
                
                manageProperties: 'Manage Properties',
                manageGolfCarts: 'Manage Golf Carts',
                addProperty: '+ Add Property',
                addGolfCart: '+ Add Golf Cart',
                propertyName: 'Name:',
                propertyDescription: 'Description:',
                propertyAddress: 'Address:',
                propertyColor: 'Calendar color:',
                addPropertyTitle: 'Add Property',
                editPropertyTitle: 'Edit Property',
                propertyBookings: 'Bookings:',
                noBookings: 'No bookings',
                totalBookings: 'Total:',
                upcomingBookings: 'Upcoming bookings:',
                noProperties: 'No properties added',
                addPropertyHint: 'Click "Add Property" to start',
                
                golfCartName: 'Name/Model:',
                golfCartOwner: 'Owner:',
                golfCartSeats: 'Seats:',
                golfCartDescription: 'Description:',
                addGolfCartTitle: 'Add Golf Cart',
                editGolfCartTitle: 'Edit Golf Cart',
                noGolfCarts: 'No golf carts added',
                addGolfCartHint: 'Click "Add Golf Cart" to start',
                seats: 'seats',
                owner: 'Owner',
                
                allBookings: 'All Bookings',
                addBooking: '+ New Booking',
                bookingTitle: 'New Booking',
                editBookingTitle: 'Edit Booking',
                selectType: 'Type:',
                selectProperty: 'Property:',
                selectGolfCart: 'Golf Cart:',
                startDate: 'Start date:',
                endDate: 'End date:',
                guestName: 'Guest name:',
                guestPhone: 'Phone:',
                notes: 'Notes:',
                bookingPrice: 'Booking price (₽):',
                deposit: 'Deposit (₽):',
                depositPaid: 'Deposit paid',
                cancellationPolicy: 'Cancellation policy:',
                freeCancellation: '🟢 Free cancellation',
                paidCancellation: '🔴 Paid cancellation',
                partialCancellation: '🟡 Partial refund',
                nonRefundable: '⛔ Non-refundable',
                freeCancelUntil: 'Free cancellation until:',
                deleteBooking: 'Delete booking',
                nightsCount: 'nights',
                daysCount: 'days',
                noPhone: 'Phone not specified',
                noNotes: 'No notes',
                unknownProperty: 'Unknown property',
                unknownGolfCart: 'Unknown golf cart',
                
                important: '❗ VERY IMPORTANT',
                depositStatus: 'Deposit:',
                paid: 'Paid',
                notPaid: 'Not paid',
                importantDetails: 'Important information',
                noImportantText: 'No additional description',
                
                january: 'January',
                february: 'February',
                march: 'March',
                april: 'April',
                may: 'May',
                june: 'June',
                july: 'July',
                august: 'August',
                september: 'September',
                october: 'October',
                november: 'November',
                december: 'December',
                
                monday: 'Mon',
                tuesday: 'Tue',
                wednesday: 'Wed',
                thursday: 'Thu',
                friday: 'Fri',
                saturday: 'Sat',
                sunday: 'Sun',
                
                viewBookings: 'Bookings',
                bookNow: 'Book now',
                viewAllBookings: 'View bookings',
                deletePropertyConfirm: 'Delete "{0}"? All related bookings will also be deleted.',
                deleteGolfCartConfirm: 'Delete "{0}"? All related bookings will also be deleted.',
                deleteBookingConfirm: 'Delete this booking?',
                bookedFor: 'Booked:',
                guest: 'Guest:',
                
                free: 'Free cancellation',
                paid: 'Paid cancellation',
                partial: 'Partial refund',
                'non-refundable': 'Non-refundable'
            }
        };
        
        this.init();
    }
    
    t(key, ...args) {
        let text = this.translations[this.language][key] || key;
        
        if (args && args.length > 0) {
            args.forEach((arg, index) => {
                text = text.replace(`{${index}}`, arg);
            });
        }
        
        return text;
    }
    
    loadDataFromElectron() {
        try {
            if (this.ipcRenderer) {
                return this.ipcRenderer.sendSync('load-data');
            }
        } catch (error) {
            console.error('Ошибка загрузки данных из Electron:', error);
        }
        
        return {
            properties: [],
            golfCarts: [],
            bookings: []
        };
    }
    
    loadLanguageFromElectron() {
        try {
            if (this.ipcRenderer) {
                return this.ipcRenderer.sendSync('load-language');
            }
        } catch (error) {
            console.error('Ошибка загрузки языка из Electron:', error);
        }
        
        return 'ru';
    }
    
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('rentalData');
            if (saved) {
                const data = JSON.parse(saved);
                if (!data.properties) data.properties = [];
                if (!data.golfCarts) data.golfCarts = [];
                if (!data.bookings) data.bookings = [];
                return data;
            }
        } catch (e) {
            console.error('Ошибка загрузки данных из localStorage:', e);
        }
        
        return {
            properties: [],
            golfCarts: [],
            bookings: []
        };
    }
    
    saveData() {
        if (this.isElectron && this.ipcRenderer) {
            try {
                this.ipcRenderer.sendSync('save-data', this.data);
                return true;
            } catch (error) {
                console.error('Ошибка сохранения данных в Electron:', error);
                return false;
            }
        } else {
            try {
                localStorage.setItem('rentalData', JSON.stringify(this.data));
                return true;
            } catch (e) {
                console.error('Ошибка сохранения данных в localStorage:', e);
                return false;
            }
        }
    }
    
    init() {
        document.documentElement.lang = this.language;
        this.initDatePicker();
        this.setupEventListeners();
        this.setupImportantCheckboxListeners();
        this.setupElectronListeners();
        this.updateUI();
        this.updateLanguageButtons();
        this.renderCalendar();
        this.loadPropertiesList();
        this.loadGolfCartsList();
        this.loadAllBookings();
        this.updateSelectedDatesInfo();
    }

    setupImportantCheckboxListeners() {
        // Для жилья
        const propertyCheckbox = document.getElementById('property-important');
        const propertyTextarea = document.getElementById('property-important-text');
        if (propertyCheckbox && propertyTextarea) {
            propertyCheckbox.addEventListener('change', function() {
                propertyTextarea.style.display = this.checked ? 'block' : 'none';
                if (!this.checked) propertyTextarea.value = '';
            });
        }

        // Для гольф-машин
        const golfCartCheckbox = document.getElementById('golf-cart-important');
        const golfCartTextarea = document.getElementById('golf-cart-important-text');
        if (golfCartCheckbox && golfCartTextarea) {
            golfCartCheckbox.addEventListener('change', function() {
                golfCartTextarea.style.display = this.checked ? 'block' : 'none';
                if (!this.checked) golfCartTextarea.value = '';
            });
        }
    }
    
    setupElectronListeners() {
        if (this.isElectron && this.ipcRenderer) {
            this.ipcRenderer.on('data-imported', (event, data) => {
                this.data = data;
                this.refreshAllData();
                this.showNotification('Данные успешно восстановлены!');
            });
            
            this.ipcRenderer.on('data-path', (event, path) => {
                console.log('Данные сохраняются в:', path);
            });
        }
    }
    
    showNotification(message) {
        alert(message);
    }
    
    initDatePicker() {
        const datePicker = flatpickr("#date-range", {
            mode: "range",
            dateFormat: "Y-m-d",
            locale: this.language,
            onChange: (selectedDates) => {
                if (selectedDates.length === 2) {
                    this.selectedDates = selectedDates;
                    this.updateSelectedDatesInfo();
                    this.checkAvailability();
                    this.renderCalendar();
                }
            }
        });
    }
    
    setupEventListeners() {
        // Переключение вкладок
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Календарь
        document.getElementById('check-availability')?.addEventListener('click', () => {
            this.checkAvailability();
        });
        
        document.getElementById('clear-selection')?.addEventListener('click', () => {
            this.selectedDates = [];
            document.getElementById('date-range').value = '';
            this.updateSelectedDatesInfo();
            this.renderCalendar();
            this.clearResults();
        });

        document.getElementById('prev-month')?.addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            this.renderCalendar();
        });

        document.getElementById('next-month')?.addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
            this.renderCalendar();
        });

        // Добавление объектов
        document.getElementById('add-property')?.addEventListener('click', () => {
            this.showPropertyModal();
        });

        document.getElementById('add-golf-cart')?.addEventListener('click', () => {
            this.showGolfCartModal();
        });

        document.getElementById('add-booking')?.addEventListener('click', () => {
            this.showBookingModal();
        });

        // Отмена в модальных окнах
        document.getElementById('cancel-property')?.addEventListener('click', () => {
            this.hideModal('property-modal');
        });

        document.getElementById('cancel-golf-cart')?.addEventListener('click', () => {
            this.hideModal('golf-cart-modal');
        });

        document.getElementById('cancel-booking')?.addEventListener('click', () => {
            this.hideModal('booking-modal');
        });

        // Сохранение
        document.getElementById('save-property')?.addEventListener('click', () => {
            this.saveProperty();
        });

        document.getElementById('save-golf-cart')?.addEventListener('click', () => {
            this.saveGolfCart();
        });

        document.getElementById('save-booking')?.addEventListener('click', () => {
            this.saveBooking();
        });

        // Удаление
        document.getElementById('delete-property')?.addEventListener('click', () => {
            if (this.currentEditingProperty && confirm(this.t('deletePropertyConfirm', this.currentEditingProperty.name))) {
                this.data.properties = this.data.properties.filter(p => p.id !== this.currentEditingProperty.id);
                this.data.bookings = this.data.bookings.filter(b => b.itemId !== this.currentEditingProperty.id || b.itemType !== 'property');
                this.saveData();
                this.loadPropertiesList();
                this.loadAllBookings();
                this.renderCalendar();
                this.hideModal('property-modal');
            }
        });

        document.getElementById('delete-golf-cart')?.addEventListener('click', () => {
            if (this.currentEditingGolfCart && confirm(this.t('deleteGolfCartConfirm', this.currentEditingGolfCart.name))) {
                this.data.golfCarts = this.data.golfCarts.filter(g => g.id !== this.currentEditingGolfCart.id);
                this.data.bookings = this.data.bookings.filter(b => b.itemId !== this.currentEditingGolfCart.id || b.itemType !== 'golf-cart');
                this.saveData();
                this.loadGolfCartsList();
                this.loadAllBookings();
                this.renderCalendar();
                this.hideModal('golf-cart-modal');
            }
        });

        document.getElementById('delete-booking')?.addEventListener('click', () => {
            if (this.currentEditingBooking && confirm(this.t('deleteBookingConfirm'))) {
                this.data.bookings = this.data.bookings.filter(b => b.id !== this.currentEditingBooking.id);
                this.saveData();
                this.loadAllBookings();
                this.renderCalendar();
                
                if (document.getElementById('calendar-tab').classList.contains('active')) {
                    this.checkAvailability();
                }
                
                this.hideModal('booking-modal');
            }
        });

        // Оверлей
        document.getElementById('modal-overlay')?.addEventListener('click', () => {
            this.hideModal('property-modal');
            this.hideModal('golf-cart-modal');
            this.hideModal('booking-modal');
        });

        // Язык
        document.getElementById('lang-ru')?.addEventListener('click', () => {
            this.switchLanguage('ru');
        });
        
        document.getElementById('lang-en')?.addEventListener('click', () => {
            this.switchLanguage('en');
        });
        
        // Импорт файлов
        document.getElementById('import-file')?.addEventListener('change', (e) => {
            this.importData(e);
        });

        // Тип бронирования меняет список объектов
        document.getElementById('booking-type')?.addEventListener('change', () => {
            this.updateBookingItemsList();
        });
        
        // Клики по карточкам
        document.addEventListener('click', (e) => {
            // Карточки жилья
            if (e.target.closest('.property-card')) {
                const card = e.target.closest('.property-card');
                const propertyId = parseInt(card.dataset.id);
                
                if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
                    this.deleteProperty(propertyId);
                } else if (e.target.classList.contains('edit-btn') || e.target.closest('.edit-btn')) {
                    this.editProperty(propertyId);
                } else if (e.target.classList.contains('view-btn') || e.target.closest('.view-btn')) {
                    this.viewPropertyBookings(propertyId);
                }
            }
            
            // Карточки гольф-машин
            if (e.target.closest('.golf-cart-card')) {
                const card = e.target.closest('.golf-cart-card');
                const cartId = parseInt(card.dataset.id);
                
                if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
                    this.deleteGolfCart(cartId);
                } else if (e.target.classList.contains('edit-btn') || e.target.closest('.edit-btn')) {
                    this.editGolfCart(cartId);
                } else if (e.target.classList.contains('view-btn') || e.target.closest('.view-btn')) {
                    this.viewGolfCartBookings(cartId);
                }
            }
            
            // Карточки бронирований
            if (e.target.closest('.booking-card')) {
                const card = e.target.closest('.booking-card');
                const bookingId = parseInt(card.dataset.bookingId);
                
                if (bookingId) {
                    if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
                        this.deleteBooking(bookingId);
                    } else if (e.target.classList.contains('edit-btn') || e.target.closest('.edit-btn')) {
                        this.editBooking(bookingId);
                    }
                }
            }
        });
        
        // Поиск в календаре
        document.getElementById('calendar-search')?.addEventListener('input', (e) => {
            this.calendarSearchQuery = e.target.value.toLowerCase().trim();
            this.updateCalendarSearchClearButton();
            if (this.selectedDates.length === 2) {
                this.checkAvailability();
            } else {
                this.clearResults();
            }
        });

        document.getElementById('clear-calendar-search')?.addEventListener('click', () => {
            this.calendarSearchQuery = '';
            document.getElementById('calendar-search').value = '';
            this.updateCalendarSearchClearButton();
            if (this.selectedDates.length === 2) {
                this.checkAvailability();
            }
        });

        // Поиск в жилье
        document.getElementById('properties-search')?.addEventListener('input', (e) => {
            this.propertiesSearchQuery = e.target.value.toLowerCase().trim();
            this.updatePropertiesSearchClearButton();
            this.loadPropertiesList();
        });
        
        document.getElementById('clear-properties-search')?.addEventListener('click', () => {
            this.propertiesSearchQuery = '';
            document.getElementById('properties-search').value = '';
            this.updatePropertiesSearchClearButton();
            this.loadPropertiesList();
        });
        
        // Поиск в гольф-машинах
        document.getElementById('golf-carts-search')?.addEventListener('input', (e) => {
            this.golfCartsSearchQuery = e.target.value.toLowerCase().trim();
            this.updateGolfCartsSearchClearButton();
            this.loadGolfCartsList();
        });
        
        document.getElementById('clear-golf-carts-search')?.addEventListener('click', () => {
            this.golfCartsSearchQuery = '';
            document.getElementById('golf-carts-search').value = '';
            this.updateGolfCartsSearchClearButton();
            this.loadGolfCartsList();
        });
        
        // Поиск в бронированиях
        document.getElementById('bookings-search')?.addEventListener('input', (e) => {
            this.bookingsSearchQuery = e.target.value.toLowerCase().trim();
            this.updateBookingsSearchClearButton();
            this.loadAllBookings();
        });
        
        document.getElementById('clear-bookings-search')?.addEventListener('click', () => {
            this.bookingsSearchQuery = '';
            document.getElementById('bookings-search').value = '';
            this.updateBookingsSearchClearButton();
            this.loadAllBookings();
        });
    }

    // Показать важное сообщение при клике на иконку
    showImportantMessage(title, message) {
        const modalId = 'important-modal-' + Date.now();
        const modalOverlay = document.getElementById('modal-overlay');

        const modalHTML = `
            <div style="max-width: 500px; padding: 25px; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); border-top: 8px solid #ff0000;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                    <span style="background: #ff0000; color: white; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 22px; animation: pulse-important 1.5s infinite;">❗</span>
                    <h3 style="margin: 0; color: #d32f2f; font-size: 20px;">${title}</h3>
                </div>
                <div style="background: #fff3f3; border-left: 6px solid #ff0000; padding: 20px; border-radius: 8px; margin-bottom: 20px; font-size: 16px; line-height: 1.6; color: #333; white-space: pre-wrap;">
                    ${message || this.t('noImportantText')}
                </div>
                <div style="display: flex; justify-content: flex-end;">
                    <button onclick="document.getElementById('${modalId}').remove(); document.getElementById('modal-overlay').style.display = 'none';" 
                            style="padding: 10px 30px; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500;">
                        ${this.t('close')}
                    </button>
                </div>
            </div>
        `;

        const modalContainer = document.createElement('div');
        modalContainer.id = modalId;
        modalContainer.className = 'modal';
        modalContainer.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1001;';
        modalContainer.innerHTML = modalHTML;

        modalOverlay.style.display = 'block';
        document.body.appendChild(modalContainer);

        modalOverlay.onclick = () => {
            document.getElementById(modalId)?.remove();
            modalOverlay.style.display = 'none';
        };
    }
    
    switchLanguage(lang) {
        this.language = lang;
        
        if (this.isElectron && this.ipcRenderer) {
            try {
                this.ipcRenderer.sendSync('save-language', lang);
            } catch (error) {
                console.error('Ошибка сохранения языка:', error);
            }
        } else {
            localStorage.setItem('rental_language', lang);
        }
        
        document.documentElement.lang = lang;
        this.updateUI();
        this.updateLanguageButtons();
        
        if (this.selectedDates.length === 2) {
            this.checkAvailability();
        }
    }
    
    updateLanguageButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.id === `lang-${this.language}`) {
                btn.classList.add('active');
            }
        });
    }
    
    updateUI() {
        // Обновление текста кнопок вкладок
        document.querySelectorAll('.tab-btn').forEach((btn) => {
            const tab = btn.dataset.tab;
            if (tab === 'calendar') btn.innerHTML = `📅 ${this.t('calendar')}`;
            if (tab === 'properties') btn.innerHTML = `🏠 ${this.t('properties')}`;
            if (tab === 'golf-carts') btn.innerHTML = `🏌️ ${this.t('golfCarts')}`;
            if (tab === 'bookings') btn.innerHTML = `📋 ${this.t('bookings')}`;
        });
        
        // Кнопки календаря
        const checkBtn = document.getElementById('check-availability');
        const clearBtn = document.getElementById('clear-selection');
        if (checkBtn) checkBtn.textContent = this.t('checkAvailability');
        if (clearBtn) clearBtn.textContent = this.t('clearSelection');
        
        // Заголовки
        const availableTitle = document.getElementById('available-title');
        if (availableTitle) availableTitle.textContent = this.t('availableProperties');
        
        const manageTitle = document.getElementById('manage-properties-title');
        if (manageTitle) manageTitle.textContent = this.t('manageProperties');
        
        const bookingsTitle = document.getElementById('all-bookings-title');
        if (bookingsTitle) bookingsTitle.textContent = this.t('allBookings');
        
        // Плейсхолдеры
        const dateRange = document.getElementById('date-range');
        if (dateRange) dateRange.placeholder = this.t('selectDates');
        
        // Кнопки добавления
        const addPropertyBtn = document.getElementById('add-property');
        if (addPropertyBtn) addPropertyBtn.textContent = this.t('addProperty');
        
        const addGolfCartBtn = document.getElementById('add-golf-cart');
        if (addGolfCartBtn) addGolfCartBtn.textContent = this.t('addGolfCart');
        
        const addBookingBtn = document.getElementById('add-booking');
        if (addBookingBtn) addBookingBtn.textContent = this.t('addBooking');
        
        this.updateSelectedDatesInfo();
        this.renderCalendar();
        this.loadPropertiesList();
        this.loadGolfCartsList();
        this.loadAllBookings();
        this.updateModals();
    }
    
    updateModals() {
        // Обновление модалки жилья
        const propertyModal = document.getElementById('property-modal');
        if (propertyModal && propertyModal.style.display === 'block') {
            const title = document.getElementById('modal-title');
            if (title) {
                title.textContent = this.currentEditingProperty ? 
                    this.t('editPropertyTitle') : this.t('addPropertyTitle');
            }
            
            const saveBtn = document.getElementById('save-property');
            const cancelBtn = document.getElementById('cancel-property');
            const deleteBtn = document.getElementById('delete-property');
            if (saveBtn) saveBtn.textContent = this.t('save');
            if (cancelBtn) cancelBtn.textContent = this.t('cancel');
            if (deleteBtn) deleteBtn.textContent = this.t('delete');
        }
        
        // Обновление модалки гольф-машины
        const golfCartModal = document.getElementById('golf-cart-modal');
        if (golfCartModal && golfCartModal.style.display === 'block') {
            const title = golfCartModal.querySelector('h3');
            if (title) {
                title.textContent = this.currentEditingGolfCart ? 
                    this.t('editGolfCartTitle') : this.t('addGolfCartTitle');
            }
            
            const saveBtn = document.getElementById('save-golf-cart');
            const cancelBtn = document.getElementById('cancel-golf-cart');
            const deleteBtn = document.getElementById('delete-golf-cart');
            if (saveBtn) saveBtn.textContent = this.t('save');
            if (cancelBtn) cancelBtn.textContent = this.t('cancel');
            if (deleteBtn) deleteBtn.textContent = this.t('delete');
        }
        
        // Обновление модалки бронирования
        const bookingModal = document.getElementById('booking-modal');
        if (bookingModal && bookingModal.style.display === 'block') {
            const title = document.getElementById('booking-modal-title');
            if (title) {
                title.textContent = this.currentEditingBooking ? 
                    this.t('editBookingTitle') : this.t('bookingTitle');
            }
            
            const typeSelect = document.getElementById('booking-type');
            if (typeSelect) {
                typeSelect.options[0].text = `🏠 ${this.t('properties')}`;
                typeSelect.options[1].text = `🏌️ ${this.t('golfCarts')}`;
            }
            
            const cancelSelect = document.getElementById('booking-cancellation');
            if (cancelSelect) {
                cancelSelect.options[0].text = this.t('freeCancellation');
                cancelSelect.options[1].text = this.t('paidCancellation');
                cancelSelect.options[2].text = this.t('partialCancellation');
                cancelSelect.options[3].text = this.t('nonRefundable');
            }
            
            const saveBtn = document.getElementById('save-booking');
            const cancelBtn = document.getElementById('cancel-booking');
            const deleteBtn = document.getElementById('delete-booking');
            if (saveBtn) saveBtn.textContent = this.t('save');
            if (cancelBtn) cancelBtn.textContent = this.t('cancel');
            if (deleteBtn) deleteBtn.textContent = this.t('deleteBooking');
        }
    }
    
    clearResults() {
        const availableContainer = document.getElementById('available-properties');
        const availableGolfContainer = document.getElementById('available-golf-carts');
        const bookedContainer = document.getElementById('booked-properties-container');
        
        if (availableContainer) availableContainer.innerHTML = '';
        if (availableGolfContainer) availableGolfContainer.innerHTML = '';
        if (bookedContainer) bookedContainer.innerHTML = '';
    }
    
    switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
        });
        
        const tabElement = document.getElementById(`${tabName}-tab`);
        if (tabElement) {
            tabElement.classList.add('active');
            document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
            
            setTimeout(() => {
                if (tabName === 'calendar') {
                    this.renderCalendar();
                    if (this.selectedDates.length === 2) {
                        this.checkAvailability();
                    }
                } else if (tabName === 'properties') {
                    this.loadPropertiesList();
                } else if (tabName === 'golf-carts') {
                    this.loadGolfCartsList();
                } else if (tabName === 'bookings') {
                    this.loadAllBookings();
                }
            }, 100);
        }
    }

    refreshAllData() {
        this.renderCalendar();
        this.loadPropertiesList();
        this.loadGolfCartsList();
        this.loadAllBookings();
        
        if (document.getElementById('calendar-tab').classList.contains('active') && 
            this.selectedDates.length === 2) {
            this.checkAvailability();
        }
        
        this.updateSelectedDatesInfo();
    }
    
    renderCalendar() {
        const calendarElement = document.getElementById('calendar');
        if (!calendarElement) return;
        
        const monthNames = [
            this.t('january'), this.t('february'), this.t('march'), 
            this.t('april'), this.t('may'), this.t('june'),
            this.t('july'), this.t('august'), this.t('september'), 
            this.t('october'), this.t('november'), this.t('december')
        ];
        
        const dayNames = [
            this.t('monday'), this.t('tuesday'), this.t('wednesday'),
            this.t('thursday'), this.t('friday'), this.t('saturday'), this.t('sunday')
        ];
        
        document.getElementById('current-month').textContent = 
            `${monthNames[this.currentMonth]} ${this.currentYear}`;
        
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        const startingDayAdjusted = startingDay === 0 ? 6 : startingDay - 1;
        
        let calendarHTML = '<div class="calendar-grid">';
        
        dayNames.forEach(day => {
            calendarHTML += `<div class="day-header">${day}</div>`;
        });
        
        for (let i = 0; i < startingDayAdjusted; i++) {
            calendarHTML += '<div class="calendar-day empty"></div>';
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentYear, this.currentMonth, day);
            const dateStr = this.formatDate(date);
            
            const isBooked = this.isDateBooked(date);
            const isSelected = this.isDateSelected(date);
            const isToday = date.getTime() === today.getTime();
            
            let className = 'calendar-day';
            if (isToday) className += ' today';
            if (isBooked) className += ' booked';
            if (isSelected) className += ' selected';
            
            const dayBookings = this.getBookingsForDate(date);
            
            calendarHTML += `
                <div class="${className}" data-date="${dateStr}">
                    <div class="day-number">${day}</div>
                    <div class="day-bookings">
                        ${dayBookings.map(booking => {
                            const color = this.getItemColor(booking.itemId, booking.itemType);
                            const important = this.getItemImportant(booking.itemId, booking.itemType);
                            return `<div class="booking-dot" style="background: ${color}; ${important ? 'border: 2px solid #ff0000; animation: pulse-important 1.5s infinite;' : ''}" 
                                         title="${this.getItemName(booking.itemId, booking.itemType)}${important ? ' ❗ ВАЖНО!' : ''}"></div>`;
                        }).join('')}
                    </div>
                </div>
            `;
        }
        
        calendarHTML += '</div>';
        calendarElement.innerHTML = calendarHTML;
        
        calendarElement.querySelectorAll('.calendar-day:not(.empty)').forEach(dayElement => {
            dayElement.addEventListener('click', (e) => {
                const dateStr = e.currentTarget.dataset.date;
                const date = new Date(dateStr);
                
                if (this.selectedDates.length === 0) {
                    this.selectedDates = [date, date];
                } else if (this.selectedDates.length === 2) {
                    this.selectedDates = [date, date];
                } else {
                    this.selectedDates[1] = date;
                    this.selectedDates.sort((a, b) => a - b);
                }
                
                if (this.selectedDates.length === 2) {
                    const dateRangeInput = document.getElementById('date-range');
                    if (dateRangeInput._flatpickr) {
                        dateRangeInput._flatpickr.setDate(this.selectedDates, true);
                    }
                }
                
                this.updateSelectedDatesInfo();
                this.checkAvailability();
                this.renderCalendar();
            });
        });
    }

    getItemColor(itemId, itemType) {
        if (itemType === 'property') {
            const property = this.data.properties.find(p => p.id === itemId);
            return property ? (property.color || '#4CAF50') : '#4CAF50';
        } else {
            const cart = this.data.golfCarts.find(g => g.id === itemId);
            return cart ? (cart.color || '#FF9800') : '#FF9800';
        }
    }

    getItemImportant(itemId, itemType) {
        if (itemType === 'property') {
            const property = this.data.properties.find(p => p.id === itemId);
            return property ? property.important || false : false;
        } else {
            const cart = this.data.golfCarts.find(g => g.id === itemId);
            return cart ? cart.important || false : false;
        }
    }

    getItemImportantText(itemId, itemType) {
        if (itemType === 'property') {
            const property = this.data.properties.find(p => p.id === itemId);
            return property ? property.importantText || '' : '';
        } else {
            const cart = this.data.golfCarts.find(g => g.id === itemId);
            return cart ? cart.importantText || '' : '';
        }
    }

    getItemName(itemId, itemType) {
        if (itemType === 'property') {
            const property = this.data.properties.find(p => p.id === itemId);
            return property ? property.name : this.t('unknownProperty');
        } else {
            const cart = this.data.golfCarts.find(g => g.id === itemId);
            return cart ? `${cart.name} (${cart.owner})` : this.t('unknownGolfCart');
        }
    }

    getOverlapDays(rangeStart, rangeEnd, bookingStart, bookingEnd) {
        const normRangeStart = this.normalizeDateStart(rangeStart);
        const normRangeEnd = this.normalizeDateEnd(rangeEnd);
        const normBookingStart = this.normalizeDateStart(bookingStart);
        const normBookingEnd = this.normalizeDateEnd(bookingEnd);
        
        const start = Math.max(normRangeStart.getTime(), normBookingStart.getTime());
        const end = Math.min(normRangeEnd.getTime(), normBookingEnd.getTime());
        
        if (start > end) return 0;
        
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + 1;
    }

    normalizeDateStart(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }

    normalizeDateEnd(date) {
        const d = new Date(date);
        d.setHours(23, 59, 59, 999);
        return d;
    }

    checkAvailability() {
        if (this.selectedDates.length !== 2) {
            const infoElement = document.getElementById('selected-dates-info');
            if (infoElement) {
                infoElement.innerHTML = `<div style="color: #666; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                    ${this.t('selectDatesHint')}
                </div>`;
            }
            return;
        }
        
        const [startDate, endDate] = this.selectedDates;
        const normalizedStart = this.normalizeDateStart(startDate);
        const normalizedEnd = this.normalizeDateEnd(endDate);
        
        // Проверяем жилье
        const bookedPropertyIds = new Set();
        const bookedPropertiesDetails = [];
        
        this.data.bookings.filter(b => b.itemType === 'property').forEach(booking => {
            const bookingStart = this.normalizeDateStart(booking.startDate);
            const bookingEnd = this.normalizeDateEnd(booking.endDate);
            
            const hasOverlap = normalizedStart <= bookingEnd && normalizedEnd >= bookingStart;
            
            if (hasOverlap) {
                bookedPropertyIds.add(booking.itemId);
                
                const property = this.data.properties.find(p => p.id === booking.itemId);
                if (property) {
                    const overlapDays = this.getOverlapDays(normalizedStart, normalizedEnd, bookingStart, bookingEnd);
                    
                    bookedPropertiesDetails.push({
                        property,
                        booking,
                        overlapDays
                    });
                }
            }
        });

        let availableProperties = this.data.properties.filter(
            property => !bookedPropertyIds.has(property.id)
        );
        
        // Проверяем гольф-машины
        const bookedGolfCartIds = new Set();
        const bookedGolfCartsDetails = [];
        
        this.data.bookings.filter(b => b.itemType === 'golf-cart').forEach(booking => {
            const bookingStart = this.normalizeDateStart(booking.startDate);
            const bookingEnd = this.normalizeDateEnd(booking.endDate);
            
            const hasOverlap = normalizedStart <= bookingEnd && normalizedEnd >= bookingStart;
            
            if (hasOverlap) {
                bookedGolfCartIds.add(booking.itemId);
                
                const cart = this.data.golfCarts.find(g => g.id === booking.itemId);
                if (cart) {
                    const overlapDays = this.getOverlapDays(normalizedStart, normalizedEnd, bookingStart, bookingEnd);
                    
                    bookedGolfCartsDetails.push({
                        cart,
                        booking,
                        overlapDays
                    });
                }
            }
        });

        let availableGolfCarts = this.data.golfCarts.filter(
            cart => !bookedGolfCartIds.has(cart.id)
        );
        
        // Фильтруем по поисковому запросу
        let filteredAvailableProperties = this.filterPropertiesBySearch(availableProperties, this.calendarSearchQuery);
        let filteredAvailableGolfCarts = this.filterGolfCartsBySearch(availableGolfCarts, this.calendarSearchQuery);
        let filteredBookedProperties = this.filterBookedPropertiesBySearch(bookedPropertiesDetails, this.calendarSearchQuery);
        let filteredBookedGolfCarts = this.filterBookedGolfCartsBySearch(bookedGolfCartsDetails, this.calendarSearchQuery);
        
        // Обновляем информацию о поиске
        const totalAvailable = filteredAvailableProperties.length + filteredAvailableGolfCarts.length;
        const totalBooked = filteredBookedProperties.length + filteredBookedGolfCarts.length;
        this.updateCalendarSearchInfo(totalAvailable, totalBooked);
        
        // Рендерим результаты
        this.renderAvailableProperties(filteredAvailableProperties);
        this.renderAvailableGolfCarts(filteredAvailableGolfCarts);
        this.renderBookedProperties(filteredBookedProperties);
        this.renderBookedGolfCarts(filteredBookedGolfCarts);
    }
    
    filterPropertiesBySearch(properties, searchQuery) {
        if (!searchQuery) return properties;
        
        const query = searchQuery.toLowerCase().trim();
        
        return properties.filter(property => {
            const searchText = (
                property.name + ' ' + 
                property.description + ' ' + 
                property.address
            ).toLowerCase();
            
            return searchText.includes(query);
        });
    }
    
    filterGolfCartsBySearch(carts, searchQuery) {
        if (!searchQuery) return carts;
        
        const query = searchQuery.toLowerCase().trim();
        
        return carts.filter(cart => {
            const searchText = (
                cart.name + ' ' + 
                cart.owner + ' ' + 
                cart.description + ' ' +
                cart.seats
            ).toLowerCase();
            
            return searchText.includes(query);
        });
    }
    
    filterBookedPropertiesBySearch(bookedItems, searchQuery) {
        if (!searchQuery) return bookedItems;
        
        const query = searchQuery.toLowerCase().trim();
        
        return bookedItems.filter(item => {
            const property = item.property;
            const booking = item.booking;
            
            const propertySearchText = (
                property.name + ' ' + 
                property.description + ' ' + 
                property.address
            ).toLowerCase();
            
            if (propertySearchText.includes(query)) return true;
            
            const bookingSearchText = (
                booking.guestName + ' ' +
                booking.phone + ' ' +
                booking.notes
            ).toLowerCase();
            
            return bookingSearchText.includes(query);
        });
    }
    
    filterBookedGolfCartsBySearch(bookedItems, searchQuery) {
        if (!searchQuery) return bookedItems;
        
        const query = searchQuery.toLowerCase().trim();
        
        return bookedItems.filter(item => {
            const cart = item.cart;
            const booking = item.booking;
            
            const cartSearchText = (
                cart.name + ' ' + 
                cart.owner + ' ' + 
                cart.description
            ).toLowerCase();
            
            if (cartSearchText.includes(query)) return true;
            
            const bookingSearchText = (
                booking.guestName + ' ' +
                booking.phone + ' ' +
                booking.notes
            ).toLowerCase();
            
            return bookingSearchText.includes(query);
        });
    }
    
    updateCalendarSearchInfo(availableCount = 0, bookedCount = 0) {
        const searchResultsDiv = document.getElementById('calendar-search-results');
        const totalFound = availableCount + bookedCount;
        
        if (searchResultsDiv) {
            if (this.calendarSearchQuery) {
                searchResultsDiv.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between; background: #f8f9fa; padding: 8px 12px; border-radius: 6px; margin-bottom: 10px;">
                        <div>
                            🔍 Найдено: <strong>${totalFound}</strong> объектов 
                            (${availableCount} свободных, ${bookedCount} занятых)
                        </div>
                        <button onclick="app.clearCalendarSearch()" style="padding: 4px 10px; background: #e2e8f0; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                            Очистить поиск
                        </button>
                    </div>
                `;
            } else {
                searchResultsDiv.innerHTML = '';
            }
        }
    }
    
    isDateBooked(date) {
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);
        
        return this.data.bookings.some(booking => {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);
            
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            
            return checkDate >= start && checkDate <= end;
        });
    }
    
    isDateSelected(date) {
        if (this.selectedDates.length !== 2) return false;
        const check = date.getTime();
        const start = this.selectedDates[0].getTime();
        const end = this.selectedDates[1].getTime();
        return check >= start && check <= end;
    }
    
    getBookingsForDate(date) {
        const dateStr = this.formatDate(date);
        return this.data.bookings.filter(booking => {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);
            const check = new Date(dateStr);
            return check >= start && check <= end;
        });
    }
    
    updateSelectedDatesInfo() {
        const infoElement = document.getElementById('selected-dates-info');
        if (!infoElement) return;
        
        if (this.selectedDates.length === 2) {
            const start = this.formatDate(this.selectedDates[0], 'dd.MM.yyyy');
            const end = this.formatDate(this.selectedDates[1], 'dd.MM.yyyy');
            const nights = Math.ceil((this.selectedDates[1] - this.selectedDates[0]) / (1000 * 60 * 60 * 24)) + 1;
            
            let nightsWord = this.t('nights');
            if (this.language === 'ru') {
                if (nights % 10 === 1 && nights % 100 !== 11) nightsWord = 'ночь';
                else if ([2,3,4].includes(nights % 10) && ![12,13,14].includes(nights % 100)) nightsWord = 'ночи';
                else nightsWord = 'ночей';
            }
            
            infoElement.innerHTML = `
                <strong>${this.t('selectedDates')}</strong><br>
                ${start} - ${end}<br>
                <small>${nights} ${nightsWord}</small>
            `;
        } else {
            infoElement.innerHTML = `<small>${this.t('selectDatesHint')}</small>`;
        }
    }
    
    renderAvailableProperties(properties) {
        const container = document.getElementById('available-properties');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (properties.length === 0) {
            if (!this.calendarSearchQuery) {
                container.innerHTML = `
                    <div style="padding: 20px; text-align: center; color: #666;">
                        <p>${this.t('noAvailable')}</p>
                    </div>
                `;
            }
            return;
        }

        const nights = Math.ceil((this.selectedDates[1] - this.selectedDates[0]) / (1000 * 60 * 60 * 24)) + 1;
        
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                ${properties.map(property => `
                    <div class="property-card available-card" style="border-left-color: ${property.color || '#4CAF50'}; ${property.important ? 'border-left-width: 8px; border-left-color: #ff0000;' : ''}">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                ${property.important ? `
                                    <span class="important-badge" onclick="event.stopPropagation(); app.showImportantMessage('${property.name.replace(/'/g, "\\'")}', ${JSON.stringify(property.importantText || this.t('noImportantText'))})" title="Нажмите, чтобы увидеть детали">❗</span>
                                ` : ''}
                                <h4 style="margin: 0;">${this.highlightText(property.name, this.calendarSearchQuery)}</h4>
                            </div>
                            <div style="width: 15px; height: 15px; border-radius: 50%; background: ${property.color || '#4CAF50'}"></div>
                        </div>
                        <p style="margin: 8px 0; color: #666; font-size: 14px;">${this.highlightText(property.description || '', this.calendarSearchQuery)}</p>
                        <p class="property-address">📍 ${this.highlightText(property.address || '', this.calendarSearchQuery)}</p>
                        <div class="property-actions" style="margin-top: 15px;">
                            <button class="primary-btn" onclick="app.bookProperty(${property.id})" style="width: 100%;">
                                ${this.t('bookNow')}
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderAvailableGolfCarts(carts) {
        const container = document.getElementById('available-golf-carts');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (carts.length === 0) {
            if (!this.calendarSearchQuery) {
                container.innerHTML = `
                    <div style="padding: 20px; text-align: center; color: #666;">
                        <p>Нет свободных гольф-машин на выбранные даты</p>
                    </div>
                `;
            }
            return;
        }

        const days = Math.ceil((this.selectedDates[1] - this.selectedDates[0]) / (1000 * 60 * 60 * 24)) + 1;
        
        container.innerHTML = `
            <h3 style="margin: 20px 0 10px 0; color: #FF9800;">🏌️ Свободные гольф-машины:</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                ${carts.map(cart => `
                    <div class="golf-cart-card available-card" style="border-left-color: ${cart.color || '#FF9800'}; ${cart.important ? 'border-left-width: 8px; border-left-color: #ff0000;' : ''}">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                ${cart.important ? `
                                    <span class="important-badge" onclick="event.stopPropagation(); app.showImportantMessage('${cart.name.replace(/'/g, "\\'")}', ${JSON.stringify(cart.importantText || this.t('noImportantText'))})" title="Нажмите, чтобы увидеть детали">❗</span>
                                ` : ''}
                                <h4 style="margin: 0;">${this.highlightText(cart.name, this.calendarSearchQuery)}</h4>
                            </div>
                            <div style="width: 15px; height: 15px; border-radius: 50%; background: ${cart.color || '#FF9800'}"></div>
                        </div>
                        <div style="margin: 5px 0; font-size: 14px;">
                            <span style="font-weight: bold;">${this.t('owner')}:</span> ${this.highlightText(cart.owner || '', this.calendarSearchQuery)}
                        </div>
                        <div style="margin: 5px 0; font-size: 14px;">
                            <span style="font-weight: bold;">${this.t('seats')}:</span> ${cart.seats || 2}
                        </div>
                        <p style="margin: 8px 0; color: #666; font-size: 14px;">${this.highlightText(cart.description || '', this.calendarSearchQuery)}</p>
                        <div class="property-actions" style="margin-top: 15px;">
                            <button class="primary-btn" onclick="app.bookGolfCart(${cart.id})" style="width: 100%; background: #FF9800;">
                                ${this.t('bookNow')}
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    highlightText(text, searchQuery) {
        if (!searchQuery || !text) return text || '';
        try {
            const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            return text.toString().replace(regex, '<mark class="highlight">$1</mark>');
        } catch (e) {
            return text;
        }
    }

    updateCalendarSearchClearButton() {
        const clearBtn = document.getElementById('clear-calendar-search');
        if (clearBtn) {
            clearBtn.style.display = this.calendarSearchQuery ? 'block' : 'none';
        }
    }

    updatePropertiesSearchClearButton() {
        const clearBtn = document.getElementById('clear-properties-search');
        if (clearBtn) {
            clearBtn.style.display = this.propertiesSearchQuery ? 'block' : 'none';
        }
    }

    updateGolfCartsSearchClearButton() {
        const clearBtn = document.getElementById('clear-golf-carts-search');
        if (clearBtn) {
            clearBtn.style.display = this.golfCartsSearchQuery ? 'block' : 'none';
        }
    }

    updateBookingsSearchClearButton() {
        const clearBtn = document.getElementById('clear-bookings-search');
        if (clearBtn) {
            clearBtn.style.display = this.bookingsSearchQuery ? 'block' : 'none';
        }
    }

    clearCalendarSearch() {
        this.calendarSearchQuery = '';
        document.getElementById('calendar-search').value = '';
        this.updateCalendarSearchClearButton();
        this.updateCalendarSearchInfo();
        if (this.selectedDates.length === 2) {
            this.checkAvailability();
        } else {
            this.clearResults();
        }
    }
    
    renderBookedProperties(bookedProperties) {
        const container = document.getElementById('booked-properties-container');
        if (!container) return;
        
        if (bookedProperties.length === 0) {
            return;
        }
        
        const existingTitle = container.querySelector('h4');
        if (!existingTitle) {
            container.innerHTML = `
                <h4 style="margin: 25px 0 15px 0; color: #e74c3c;">
                    ${this.t('bookedProperties')}
                    ${this.calendarSearchQuery ? `<span style="font-size: 14px; color: #666;"> (найдено: ${bookedProperties.length})</span>` : ''}
                </h4>
            `;
        }
        
        const itemsHTML = bookedProperties.map(item => {
            const { property, booking, overlapDays } = item;
            const bookingStart = new Date(booking.startDate);
            const bookingEnd = new Date(booking.endDate);
            const totalBookingNights = Math.ceil((bookingEnd - bookingStart) / (1000 * 60 * 60 * 24)) + 1;
            
            return `
                <div class="booked-property-item" style="border-left: 4px solid ${property.color || '#e74c3c'}; ${property.important ? 'border-left-width: 8px; border-left-color: #ff0000;' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            ${property.important ? `
                                <span class="important-badge-small" onclick="event.stopPropagation(); app.showImportantMessage('${property.name.replace(/'/g, "\\'")}', ${JSON.stringify(property.importantText || this.t('noImportantText'))})" title="Нажмите, чтобы увидеть детали">❗</span>
                            ` : ''}
                            <strong style="color: #c53030;">${this.highlightText(property.name, this.calendarSearchQuery)}</strong>
                        </div>
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: ${property.color || '#e74c3c'}"></div>
                    </div>
                    
                    <div style="font-size: 12px; color: #666; margin-bottom: 5px;">
                        ${this.highlightText(property.address || '', this.calendarSearchQuery)}
                    </div>
                    
                    <div style="font-size: 11px; color: #e53e3e; background: #fed7d7; padding: 4px 8px; border-radius: 4px; margin: 8px 0;">
                        <strong>${this.t('bookedFor')}</strong> ${this.formatDate(bookingStart, 'dd.MM.yy')} - ${this.formatDate(bookingEnd, 'dd.MM.yy')}
                        (${totalBookingNights} ${this.t('nights')})
                    </div>
                    
                    <div style="font-size: 11px; color: #c05621; background: #feebc8; padding: 4px 8px; border-radius: 4px; margin: 8px 0;">
                        <strong>Пересекается:</strong> ${overlapDays} ${this.t('nights')} 
                        ${this.language === 'ru' ? 'с выбранным периодом' : 'with selected period'}
                    </div>
                    
                    <div style="font-size: 12px; margin-top: 8px;">
                        <div><strong>${this.t('guest')}</strong> ${this.highlightText(booking.guestName, this.calendarSearchQuery)}</div>
                        ${booking.phone ? `<div>${this.highlightText(booking.phone, this.calendarSearchQuery)}</div>` : ''}
                        ${booking.notes ? `<div style="margin-top: 4px; font-style: italic;">${this.highlightText(booking.notes, this.calendarSearchQuery)}</div>` : ''}
                        
                        <div style="margin-top: 8px; display: flex; gap: 10px; flex-wrap: wrap;">
                            <span style="background: #e8f5e9; padding: 2px 8px; border-radius: 12px; font-size: 11px;">
                                💰 ${booking.price} ₽
                            </span>
                            <span style="background: ${booking.depositPaid ? '#e8f5e9' : '#ffebee'}; padding: 2px 8px; border-radius: 12px; font-size: 11px;">
                                💵 ${this.t('deposit')} ${booking.deposit || 0} ₽
                                (${booking.depositPaid ? '✅' : '❌'})
                            </span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 10px; display: flex; gap: 8px;">
                        <button onclick="app.editBooking(${booking.id})" 
                                style="flex: 1; padding: 6px 12px; background: #f6ad55; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                            ${this.t('edit')}
                        </button>
                        <button onclick="app.viewPropertyBookings(${property.id})" 
                                style="flex: 1; padding: 6px 12px; background: #4299e1; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                            ${this.t('viewAllBookings')}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        const contentDiv = document.createElement('div');
        contentDiv.style.display = 'flex';
        contentDiv.style.flexDirection = 'column';
        contentDiv.style.gap = '12px';
        contentDiv.innerHTML = itemsHTML;
        
        container.appendChild(contentDiv);
    }

    renderBookedGolfCarts(bookedItems) {
        const container = document.getElementById('booked-properties-container');
        if (!container) return;
        
        if (bookedItems.length === 0) return;
        
        const title = document.createElement('h4');
        title.style.cssText = 'margin: 25px 0 15px 0; color: #e74c3c;';
        title.textContent = `🏌️ Занятые гольф-машины: ${this.calendarSearchQuery ? `(найдено: ${bookedItems.length})` : ''}`;
        container.appendChild(title);
        
        const itemsHTML = bookedItems.map(item => {
            const { cart, booking, overlapDays } = item;
            const bookingStart = new Date(booking.startDate);
            const bookingEnd = new Date(booking.endDate);
            const totalBookingDays = Math.ceil((bookingEnd - bookingStart) / (1000 * 60 * 60 * 24)) + 1;
            
            return `
                <div class="booked-property-item" style="border-left: 4px solid ${cart.color || '#FF9800'}; ${cart.important ? 'border-left-width: 8px; border-left-color: #ff0000;' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            ${cart.important ? `
                                <span class="important-badge-small" onclick="event.stopPropagation(); app.showImportantMessage('${cart.name.replace(/'/g, "\\'")}', ${JSON.stringify(cart.importantText || this.t('noImportantText'))})" title="Нажмите, чтобы увидеть детали">❗</span>
                            ` : ''}
                            <strong style="color: #c53030;">${this.highlightText(cart.name, this.calendarSearchQuery)}</strong>
                        </div>
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: ${cart.color || '#FF9800'}"></div>
                    </div>
                    
                    <div style="margin: 5px 0; font-size: 12px;">
                        <span style="font-weight: bold;">${this.t('owner')}:</span> ${this.highlightText(cart.owner || '', this.calendarSearchQuery)}
                    </div>
                    <div style="margin: 5px 0; font-size: 12px;">
                        <span style="font-weight: bold;">${this.t('seats')}:</span> ${cart.seats || 2}
                    </div>
                    
                    <div style="font-size: 11px; color: #e53e3e; background: #fed7d7; padding: 4px 8px; border-radius: 4px; margin: 8px 0;">
                        <strong>${this.t('bookedFor')}</strong> ${this.formatDate(bookingStart, 'dd.MM.yy')} - ${this.formatDate(bookingEnd, 'dd.MM.yy')}
                        (${totalBookingDays} ${this.t('days')})
                    </div>
                    
                    <div style="font-size: 11px; color: #c05621; background: #feebc8; padding: 4px 8px; border-radius: 4px; margin: 8px 0;">
                        <strong>Пересекается:</strong> ${overlapDays} ${this.t('days')} 
                        ${this.language === 'ru' ? 'с выбранным периодом' : 'with selected period'}
                    </div>
                    
                    <div style="font-size: 12px; margin-top: 8px;">
                        <div><strong>${this.t('guest')}</strong> ${this.highlightText(booking.guestName, this.calendarSearchQuery)}</div>
                        ${booking.phone ? `<div>${this.highlightText(booking.phone, this.calendarSearchQuery)}</div>` : ''}
                        <div style="margin-top: 5px;">
                            <span style="background: #e8f5e9; padding: 2px 8px; border-radius: 12px; font-size: 11px;">
                                💰 ${booking.price} ₽
                            </span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 10px; display: flex; gap: 8px;">
                        <button onclick="app.editBooking(${booking.id})" 
                                style="flex: 1; padding: 6px 12px; background: #f6ad55; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                            ${this.t('edit')}
                        </button>
                        <button onclick="app.viewGolfCartBookings(${cart.id})" 
                                style="flex: 1; padding: 6px 12px; background: #4299e1; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                            ${this.t('viewAllBookings')}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        const contentDiv = document.createElement('div');
        contentDiv.style.display = 'flex';
        contentDiv.style.flexDirection = 'column';
        contentDiv.style.gap = '12px';
        contentDiv.innerHTML = itemsHTML;
        
        container.appendChild(contentDiv);
    }
    
    loadPropertiesList() {
        const container = document.getElementById('properties-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        let filteredProperties = this.filterPropertiesBySearch(this.data.properties, this.propertiesSearchQuery);
        
        this.updatePropertiesSearchInfo(filteredProperties.length);
        
        if (this.propertiesSearchQuery && filteredProperties.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <div style="font-size: 48px; margin-bottom: 20px;">🔍</div>
                    <h4 style="margin-bottom: 10px;">Жилье не найдено</h4>
                    <p>По запросу <strong>"${this.propertiesSearchQuery}"</strong> не найдено ни одного объекта жилья.</p>
                    <button onclick="app.clearPropertiesSearch()" style="margin-top: 15px; padding: 8px 20px; background: #4299e1; color: white; border: none; border-radius: 6px; cursor: pointer;">
                        Очистить поиск
                    </button>
                </div>
            `;
            return;
        }
        
        if (filteredProperties.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <p>${this.t('noProperties')}</p>
                    <p>${this.t('addPropertyHint')}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filteredProperties.map(property => {
            const propertyBookings = this.data.bookings.filter(b => b.itemId === property.id && b.itemType === 'property');
            
            return `
                <div class="property-card" data-id="${property.id}" style="border-left-color: ${property.color || '#4CAF50'}; ${property.important ? 'border-left-width: 8px; border-left-color: #ff0000;' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            ${property.important ? `
                                <span class="important-badge" onclick="event.stopPropagation(); app.showImportantMessage('${property.name.replace(/'/g, "\\'")}', ${JSON.stringify(property.importantText || this.t('noImportantText'))})" title="Нажмите, чтобы увидеть детали">❗</span>
                            ` : ''}
                            <h3>${this.highlightText(property.name, this.propertiesSearchQuery)}</h3>
                        </div>
                        <div style="width: 20px; height: 20px; border-radius: 50%; background: ${property.color || '#4CAF50'}"></div>
                    </div>
                    <p>${this.highlightText(property.description || '', this.propertiesSearchQuery)}</p>
                    <p class="property-address">📍 ${this.highlightText(property.address || '', this.propertiesSearchQuery)}</p>
                    
                    <div style="margin-top: 15px;">
                        <strong>${this.t('propertyBookings')}</strong>
                        ${propertyBookings.length === 0 ? 
                            `<p style="color: #999; font-size: 14px;">${this.t('noBookings')}</p>` : 
                            `<p style="color: #666; font-size: 14px;">${this.t('totalBookings')} ${propertyBookings.length}</p>`
                        }
                    </div>
                    
                    <div class="property-actions">
                        <button class="view-btn">
                            ${this.t('viewBookings')} (${propertyBookings.length})
                        </button>
                        <button class="edit-btn">
                            ${this.t('edit')}
                        </button>
                        <button class="delete-btn">
                            ${this.t('delete')}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    updatePropertiesSearchInfo(filteredCount) {
        const searchResultsDiv = document.getElementById('properties-search-results');
        
        if (searchResultsDiv) {
            if (this.propertiesSearchQuery) {
                searchResultsDiv.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between; background: #f8f9fa; padding: 8px 12px; border-radius: 6px; margin-bottom: 10px;">
                        <div>
                            🔍 Найдено: <strong>${filteredCount}</strong> из ${this.data.properties.length}
                        </div>
                        <button onclick="app.clearPropertiesSearch()" style="padding: 4px 10px; background: #e2e8f0; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                            Очистить поиск
                        </button>
                    </div>
                `;
            } else {
                searchResultsDiv.innerHTML = '';
            }
        }
    }

    clearPropertiesSearch() {
        this.propertiesSearchQuery = '';
        document.getElementById('properties-search').value = '';
        this.updatePropertiesSearchClearButton();
        this.loadPropertiesList();
    }

    loadGolfCartsList() {
        const container = document.getElementById('golf-carts-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        let filteredCarts = this.filterGolfCartsBySearch(this.data.golfCarts, this.golfCartsSearchQuery);
        
        this.updateGolfCartsSearchInfo(filteredCarts.length);
        
        if (this.golfCartsSearchQuery && filteredCarts.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <div style="font-size: 48px; margin-bottom: 20px;">🔍</div>
                    <h4 style="margin-bottom: 10px;">Гольф-машины не найдены</h4>
                    <p>По запросу <strong>"${this.golfCartsSearchQuery}"</strong> не найдено ни одной машины.</p>
                    <button onclick="app.clearGolfCartsSearch()" style="margin-top: 15px; padding: 8px 20px; background: #4299e1; color: white; border: none; border-radius: 6px; cursor: pointer;">
                        Очистить поиск
                    </button>
                </div>
            `;
            return;
        }
        
        if (filteredCarts.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <p>${this.t('noGolfCarts')}</p>
                    <p>${this.t('addGolfCartHint')}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filteredCarts.map(cart => {
            const cartBookings = this.data.bookings.filter(b => b.itemId === cart.id && b.itemType === 'golf-cart');
            
            return `
                <div class="golf-cart-card" data-id="${cart.id}" style="border-left-color: ${cart.color || '#FF9800'}; ${cart.important ? 'border-left-width: 8px; border-left-color: #ff0000;' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            ${cart.important ? `
                                <span class="important-badge" onclick="event.stopPropagation(); app.showImportantMessage('${cart.name.replace(/'/g, "\\'")}', ${JSON.stringify(cart.importantText || this.t('noImportantText'))})" title="Нажмите, чтобы увидеть детали">❗</span>
                            ` : ''}
                            <h3>${this.highlightText(cart.name, this.golfCartsSearchQuery)}</h3>
                        </div>
                        <div style="width: 20px; height: 20px; border-radius: 50%; background: ${cart.color || '#FF9800'}"></div>
                    </div>
                    <div style="margin: 10px 0;">
                        <div><strong>${this.t('owner')}:</strong> ${this.highlightText(cart.owner || '', this.golfCartsSearchQuery)}</div>
                        <div><strong>${this.t('seats')}:</strong> ${cart.seats || 2}</div>
                    </div>
                    <p>${this.highlightText(cart.description || '', this.golfCartsSearchQuery)}</p>
                    
                    <div style="margin-top: 15px;">
                        <strong>${this.t('propertyBookings')}</strong>
                        ${cartBookings.length === 0 ? 
                            `<p style="color: #999; font-size: 14px;">${this.t('noBookings')}</p>` : 
                            `<p style="color: #666; font-size: 14px;">${this.t('totalBookings')} ${cartBookings.length}</p>`
                        }
                    </div>
                    
                    <div class="property-actions">
                        <button class="view-btn">
                            ${this.t('viewBookings')} (${cartBookings.length})
                        </button>
                        <button class="edit-btn">
                            ${this.t('edit')}
                        </button>
                        <button class="delete-btn">
                            ${this.t('delete')}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateGolfCartsSearchInfo(filteredCount) {
        const searchResultsDiv = document.getElementById('golf-carts-search-results');
        
        if (searchResultsDiv) {
            if (this.golfCartsSearchQuery) {
                searchResultsDiv.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between; background: #f8f9fa; padding: 8px 12px; border-radius: 6px; margin-bottom: 10px;">
                        <div>
                            🔍 Найдено: <strong>${filteredCount}</strong> из ${this.data.golfCarts.length}
                        </div>
                        <button onclick="app.clearGolfCartsSearch()" style="padding: 4px 10px; background: #e2e8f0; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                            Очистить поиск
                        </button>
                    </div>
                `;
            } else {
                searchResultsDiv.innerHTML = '';
            }
        }
    }

    clearGolfCartsSearch() {
        this.golfCartsSearchQuery = '';
        document.getElementById('golf-carts-search').value = '';
        this.updateGolfCartsSearchClearButton();
        this.loadGolfCartsList();
    }

    loadAllBookings() {
        const container = document.getElementById('all-bookings');
        if (!container) return;
        
        let sortedBookings = [...this.data.bookings].sort((a, b) => 
            new Date(a.startDate) - new Date(b.startDate)
        );
        
        let filteredBookings = this.filterBookingsBySearch(sortedBookings, this.bookingsSearchQuery);
        
        this.updateBookingsSearchInfo(filteredBookings.length);
        
        if (this.bookingsSearchQuery && filteredBookings.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <div style="font-size: 48px; margin-bottom: 20px;">🔍</div>
                    <h4 style="margin-bottom: 10px;">Бронирования не найдены</h4>
                    <p>По запросу <strong>"${this.bookingsSearchQuery}"</strong> не найдено ни одного бронирования.</p>
                    <button onclick="app.clearBookingsSearch()" style="margin-top: 15px; padding: 8px 20px; background: #4299e1; color: white; border: none; border-radius: 6px; cursor: pointer;">
                        Очистить поиск
                    </button>
                </div>
            `;
            return;
        }
        
        if (filteredBookings.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <p>${this.t('noBookings')}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filteredBookings.map(booking => {
            const itemType = booking.itemType || 'property';
            let itemName = '';
            let itemColor = '';
            let itemImportant = false;
            let itemImportantText = '';
            
            if (itemType === 'property') {
                const property = this.data.properties.find(p => p.id === booking.itemId);
                itemName = property ? property.name : this.t('unknownProperty');
                itemColor = property ? (property.color || '#4CAF50') : '#4CAF50';
                itemImportant = property ? property.important : false;
                itemImportantText = property ? property.importantText : '';
            } else {
                const cart = this.data.golfCarts.find(g => g.id === booking.itemId);
                itemName = cart ? `${cart.name} (${cart.owner})` : this.t('unknownGolfCart');
                itemColor = cart ? (cart.color || '#FF9800') : '#FF9800';
                itemImportant = cart ? cart.important : false;
                itemImportantText = cart ? cart.importantText : '';
            }
            
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);
            const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            
            return `
                <div class="booking-card" data-booking-id="${booking.id}" style="border-left: 5px solid ${itemColor}; ${itemImportant ? 'border-left-width: 8px; border-left-color: #ff0000;' : ''}">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            ${itemImportant ? `
                                <span class="important-badge-small" onclick="event.stopPropagation(); app.showImportantMessage('${itemName.replace(/'/g, "\\'")}', ${JSON.stringify(itemImportantText || this.t('noImportantText'))})" title="Нажмите, чтобы увидеть детали">❗</span>
                            ` : ''}
                            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${itemColor}"></div>
                            <div>
                                <strong>${this.highlightText(itemName, this.bookingsSearchQuery)}</strong>
                                <span style="font-size: 11px; color: #666; margin-left: 8px;">
                                    ${itemType === 'property' ? '🏠' : '🏌️'}
                                </span>
                            </div>
                        </div>
                        <div class="booking-dates">
                            ${this.formatDate(startDate, 'dd.MM.yyyy')} - ${this.formatDate(endDate, 'dd.MM.yyyy')} 
                            (${days} ${itemType === 'property' ? this.t('nights') : this.t('days')})
                        </div>
                        <div class="booking-guest">${this.highlightText(booking.guestName, this.bookingsSearchQuery)}</div>
                        <div style="color: #666; margin-top: 5px;">${this.highlightText(booking.phone || this.t('noPhone'), this.bookingsSearchQuery)}</div>
                        
                        <div style="margin-top: 8px; display: flex; gap: 10px; flex-wrap: wrap;">
                            <span style="background: #e8f5e9; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                                💰 ${booking.price} ₽
                            </span>
                            <span style="background: ${booking.depositPaid ? '#e8f5e9' : '#ffebee'}; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                                💵 ${this.t('deposit')} ${booking.deposit || 0} ₽
                                (${booking.depositPaid ? '✅ ' + this.t('paid') : '❌ ' + this.t('notPaid')})
                            </span>
                            <span style="background: #fff3e0; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                                🚫 ${this.t(booking.cancellationPolicy || 'free')}
                            </span>
                        </div>
                        
                        ${booking.freeCancelUntil ? `
                            <div style="color: #666; margin-top: 5px; font-size: 12px;">
                                ⏰ ${this.t('freeCancelUntil')} ${booking.freeCancelUntil}
                            </div>
                        ` : ''}
                        
                        ${booking.notes ? `
                            <div style="color: #666; margin-top: 5px; font-size: 12px; font-style: italic;">
                                📝 ${this.highlightText(booking.notes, this.bookingsSearchQuery)}
                            </div>
                        ` : ''}
                    </div>
                    <div class="booking-actions">
                        <button class="edit-btn">${this.t('edit')}</button>
                        <button class="delete-btn">${this.t('delete')}</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    filterBookingsBySearch(bookings, searchQuery) {
        if (!searchQuery) return bookings;
        
        const query = searchQuery.toLowerCase().trim();
        
        return bookings.filter(booking => {
            const itemType = booking.itemType || 'property';
            let itemName = '';
            let itemOwner = '';
            
            if (itemType === 'property') {
                const property = this.data.properties.find(p => p.id === booking.itemId);
                itemName = property ? property.name : '';
            } else {
                const cart = this.data.golfCarts.find(g => g.id === booking.itemId);
                itemName = cart ? cart.name : '';
                itemOwner = cart ? cart.owner : '';
            }
            
            const searchText = (
                itemName + ' ' + 
                itemOwner + ' ' +
                booking.guestName + ' ' + 
                booking.phone + ' ' + 
                booking.notes + ' ' +
                this.formatDate(new Date(booking.startDate), 'dd.MM.yyyy') + ' ' +
                this.formatDate(new Date(booking.endDate), 'dd.MM.yyyy') + ' ' +
                booking.price + ' ' +
                booking.deposit
            ).toLowerCase();
            
            return searchText.includes(query);
        });
    }

    updateBookingsSearchInfo(filteredCount) {
        const searchResultsDiv = document.getElementById('bookings-search-results');
        
        if (searchResultsDiv) {
            if (this.bookingsSearchQuery) {
                searchResultsDiv.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between; background: #f8f9fa; padding: 8px 12px; border-radius: 6px; margin-bottom: 10px;">
                        <div>
                            🔍 Найдено: <strong>${filteredCount}</strong> из ${this.data.bookings.length}
                        </div>
                        <button onclick="app.clearBookingsSearch()" style="padding: 4px 10px; background: #e2e8f0; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                            Очистить поиск
                        </button>
                    </div>
                `;
            } else {
                searchResultsDiv.innerHTML = '';
            }
        }
    }

    clearBookingsSearch() {
        this.bookingsSearchQuery = '';
        document.getElementById('bookings-search').value = '';
        this.updateBookingsSearchClearButton();
        this.loadAllBookings();
    }
    
    bookProperty(propertyId) {
        this.currentEditingBooking = null;
        document.getElementById('booking-type').value = 'property';
        this.updateBookingItemsList();
        document.getElementById('booking-item').value = propertyId;
        this.showBookingModal();
    }

    bookGolfCart(cartId) {
        this.currentEditingBooking = null;
        document.getElementById('booking-type').value = 'golf-cart';
        this.updateBookingItemsList();
        document.getElementById('booking-item').value = cartId;
        this.showBookingModal();
    }
    
    viewPropertyBookings(propertyId) {
        const property = this.data.properties.find(p => p.id === propertyId);
        if (!property) return;
        
        const bookings = this.data.bookings
            .filter(b => b.itemId === propertyId && b.itemType === 'property')
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        
        const modalId = 'bookings-modal-' + Date.now();
        
        let bookingsHTML = `
            <div style="max-width: 600px; padding: 20px; background: white; border-radius: 10px; max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    ${property.important ? `
                        <span class="important-badge" onclick="event.stopPropagation(); app.showImportantMessage('${property.name.replace(/'/g, "\\'")}', ${JSON.stringify(property.importantText || this.t('noImportantText'))})" title="Нажмите, чтобы увидеть детали">❗</span>
                    ` : ''}
                    <h3 style="margin: 0;">${this.t('propertyBookings')}: ${property.name}</h3>
                </div>
        `;
        
        if (bookings.length === 0) {
            bookingsHTML += `<p style="color: #666; text-align: center; padding: 20px;">${this.t('noBookings')}</p>`;
        } else {
            bookingsHTML += bookings.map(booking => {
                const startDate = new Date(booking.startDate);
                const endDate = new Date(booking.endDate);
                const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                
                return `
                    <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin-bottom: 10px; border-left: 4px solid ${property.color || '#4CAF50'}">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <div style="color: #e74c3c; font-weight: bold; font-size: 14px;">
                                    ${this.formatDate(startDate, 'dd.MM.yyyy')} - ${this.formatDate(endDate, 'dd.MM.yyyy')} (${nights} ${this.t('nights')})
                                </div>
                                <div style="font-weight: 600; margin: 5px 0;">${booking.guestName}</div>
                                <div style="color: #666; margin-top: 5px;">${booking.phone || this.t('noPhone')}</div>
                                <div style="color: #666; margin-top: 5px;">${booking.notes || this.t('noNotes')}</div>
                                <div style="margin-top: 8px; display: flex; gap: 10px; flex-wrap: wrap;">
                                    <span style="background: #e8f5e9; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                                        💰 ${booking.price} ₽
                                    </span>
                                    <span style="background: ${booking.depositPaid ? '#e8f5e9' : '#ffebee'}; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                                        💵 ${this.t('deposit')} ${booking.deposit || 0} ₽
                                        (${booking.depositPaid ? '✅' : '❌'})
                                    </span>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                <button onclick="app.editBooking(${booking.id})" 
                                        style="padding: 5px 10px; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer;">
                                    ${this.t('edit')}
                                </button>
                                <button onclick="app.deleteBooking(${booking.id})" 
                                        style="padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">
                                    ${this.t('delete')}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
        
        bookingsHTML += `
            <div style="margin-top: 20px; display: flex; justify-content: center; gap: 10px;">
                <button onclick="document.getElementById('${modalId}').remove(); document.getElementById('modal-overlay').style.display = 'none';" 
                        style="padding: 10px 30px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    ${this.t('close')}
                </button>
                <button onclick="app.bookProperty(${propertyId}); document.getElementById('${modalId}').remove();" 
                        style="padding: 10px 30px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    ${this.t('addBooking')}
                </button>
            </div>
        </div>`;
        
        const modalOverlay = document.getElementById('modal-overlay');
        const modalContainer = document.createElement('div');
        modalContainer.id = modalId;
        modalContainer.className = 'modal';
        modalContainer.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1001;';
        modalContainer.innerHTML = bookingsHTML;
        
        modalOverlay.style.display = 'block';
        document.body.appendChild(modalContainer);
        
        modalOverlay.onclick = () => {
            document.getElementById(modalId)?.remove();
            modalOverlay.style.display = 'none';
        };
    }

    viewGolfCartBookings(cartId) {
        const cart = this.data.golfCarts.find(g => g.id === cartId);
        if (!cart) return;
        
        const bookings = this.data.bookings
            .filter(b => b.itemId === cartId && b.itemType === 'golf-cart')
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        
        const modalId = 'bookings-modal-' + Date.now();
        
        let bookingsHTML = `
            <div style="max-width: 600px; padding: 20px; background: white; border-radius: 10px; max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    ${cart.important ? `
                        <span class="important-badge" onclick="event.stopPropagation(); app.showImportantMessage('${cart.name.replace(/'/g, "\\'")}', ${JSON.stringify(cart.importantText || this.t('noImportantText'))})" title="Нажмите, чтобы увидеть детали">❗</span>
                    ` : ''}
                    <h3 style="margin: 0;">Бронирования гольф-машины: ${cart.name}</h3>
                </div>
        `;
        
        if (bookings.length === 0) {
            bookingsHTML += `<p style="color: #666; text-align: center; padding: 20px;">${this.t('noBookings')}</p>`;
        } else {
            bookingsHTML += bookings.map(booking => {
                const startDate = new Date(booking.startDate);
                const endDate = new Date(booking.endDate);
                const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                
                return `
                    <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin-bottom: 10px; border-left: 4px solid ${cart.color || '#FF9800'}">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <div style="color: #e74c3c; font-weight: bold; font-size: 14px;">
                                    ${this.formatDate(startDate, 'dd.MM.yyyy')} - ${this.formatDate(endDate, 'dd.MM.yyyy')} (${days} ${this.t('days')})
                                </div>
                                <div style="font-weight: 600; margin: 5px 0;">${booking.guestName}</div>
                                <div style="color: #666; margin-top: 5px;">${booking.phone || this.t('noPhone')}</div>
                                <div style="margin-top: 8px;">
                                    <span style="background: #e8f5e9; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                                        💰 ${booking.price} ₽
                                    </span>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                <button onclick="app.editBooking(${booking.id})" 
                                        style="padding: 5px 10px; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer;">
                                    ${this.t('edit')}
                                </button>
                                <button onclick="app.deleteBooking(${booking.id})" 
                                        style="padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">
                                    ${this.t('delete')}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
        
        bookingsHTML += `
            <div style="margin-top: 20px; display: flex; justify-content: center; gap: 10px;">
                <button onclick="document.getElementById('${modalId}').remove(); document.getElementById('modal-overlay').style.display = 'none';" 
                        style="padding: 10px 30px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    ${this.t('close')}
                </button>
                <button onclick="app.bookGolfCart(${cartId}); document.getElementById('${modalId}').remove();" 
                        style="padding: 10px 30px; background: #FF9800; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    ${this.t('addBooking')}
                </button>
            </div>
        </div>`;
        
        const modalOverlay = document.getElementById('modal-overlay');
        const modalContainer = document.createElement('div');
        modalContainer.id = modalId;
        modalContainer.className = 'modal';
        modalContainer.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1001;';
        modalContainer.innerHTML = bookingsHTML;
        
        modalOverlay.style.display = 'block';
        document.body.appendChild(modalContainer);
        
        modalOverlay.onclick = () => {
            document.getElementById(modalId)?.remove();
            modalOverlay.style.display = 'none';
        };
    }
    
    hideModal(modalId = null) {
        if (modalId) {
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = 'none';
        } else {
            const propertyModal = document.getElementById('property-modal');
            const golfCartModal = document.getElementById('golf-cart-modal');
            const bookingModal = document.getElementById('booking-modal');
            
            if (propertyModal) propertyModal.style.display = 'none';
            if (golfCartModal) golfCartModal.style.display = 'none';
            if (bookingModal) bookingModal.style.display = 'none';
        }
        
        const overlay = document.getElementById('modal-overlay');
        if (overlay) overlay.style.display = 'none';
        
        this.currentEditingProperty = null;
        this.currentEditingGolfCart = null;
        this.currentEditingBooking = null;
    }
    
    showPropertyModal(propertyId = null) {
        const modal = document.getElementById('property-modal');
        const overlay = document.getElementById('modal-overlay');
        const title = document.getElementById('modal-title');
        const deleteBtn = document.getElementById('delete-property');
        
        if (propertyId) {
            this.currentEditingProperty = this.data.properties.find(p => p.id === propertyId);
            if (!this.currentEditingProperty) return;
            
            title.textContent = this.t('editPropertyTitle');
            deleteBtn.style.display = 'block';
            
            document.getElementById('property-name').value = this.currentEditingProperty.name || '';
            document.getElementById('property-description').value = this.currentEditingProperty.description || '';
            document.getElementById('property-address').value = this.currentEditingProperty.address || '';
            document.getElementById('property-color').value = this.currentEditingProperty.color || '#4CAF50';
            document.getElementById('property-important').checked = this.currentEditingProperty.important || false;
            document.getElementById('property-important-text').value = this.currentEditingProperty.importantText || '';
            document.getElementById('property-important-text').style.display = this.currentEditingProperty.important ? 'block' : 'none';
        } else {
            this.currentEditingProperty = null;
            title.textContent = this.t('addPropertyTitle');
            deleteBtn.style.display = 'none';
            
            document.getElementById('property-name').value = '';
            document.getElementById('property-description').value = '';
            document.getElementById('property-address').value = '';
            document.getElementById('property-color').value = '#4CAF50';
            document.getElementById('property-important').checked = false;
            document.getElementById('property-important-text').value = '';
            document.getElementById('property-important-text').style.display = 'none';
        }
        
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }

    showGolfCartModal(cartId = null) {
        const modal = document.getElementById('golf-cart-modal');
        const overlay = document.getElementById('modal-overlay');
        const deleteBtn = document.getElementById('delete-golf-cart');
        
        if (cartId) {
            this.currentEditingGolfCart = this.data.golfCarts.find(g => g.id === cartId);
            if (!this.currentEditingGolfCart) return;
            
            deleteBtn.style.display = 'block';
            
            document.getElementById('golf-cart-name').value = this.currentEditingGolfCart.name || '';
            document.getElementById('golf-cart-owner').value = this.currentEditingGolfCart.owner || '';
            document.getElementById('golf-cart-seats').value = this.currentEditingGolfCart.seats || 2;
            document.getElementById('golf-cart-description').value = this.currentEditingGolfCart.description || '';
            document.getElementById('golf-cart-color').value = this.currentEditingGolfCart.color || '#FF9800';
            document.getElementById('golf-cart-important').checked = this.currentEditingGolfCart.important || false;
            document.getElementById('golf-cart-important-text').value = this.currentEditingGolfCart.importantText || '';
            document.getElementById('golf-cart-important-text').style.display = this.currentEditingGolfCart.important ? 'block' : 'none';
        } else {
            this.currentEditingGolfCart = null;
            deleteBtn.style.display = 'none';
            
            document.getElementById('golf-cart-name').value = '';
            document.getElementById('golf-cart-owner').value = '';
            document.getElementById('golf-cart-seats').value = '2';
            document.getElementById('golf-cart-description').value = '';
            document.getElementById('golf-cart-color').value = '#FF9800';
            document.getElementById('golf-cart-important').checked = false;
            document.getElementById('golf-cart-important-text').value = '';
            document.getElementById('golf-cart-important-text').style.display = 'none';
        }
        
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }
    
    showBookingModal(itemId = null) {
        const modal = document.getElementById('booking-modal');
        const overlay = document.getElementById('modal-overlay');
        const title = document.getElementById('booking-modal-title');
        const deleteBtn = document.getElementById('delete-booking');
        
        this.updateBookingItemsList();
        
        if (this.currentEditingBooking) {
            title.textContent = this.t('editBookingTitle');
            deleteBtn.style.display = 'block';
            
            document.getElementById('booking-type').value = this.currentEditingBooking.itemType || 'property';
            this.updateBookingItemsList();
            document.getElementById('booking-item').value = this.currentEditingBooking.itemId;
            document.getElementById('booking-start').value = this.currentEditingBooking.startDate;
            document.getElementById('booking-end').value = this.currentEditingBooking.endDate;
            document.getElementById('booking-guest').value = this.currentEditingBooking.guestName || '';
            document.getElementById('booking-phone').value = this.currentEditingBooking.phone || '';
            document.getElementById('booking-notes').value = this.currentEditingBooking.notes || '';
            document.getElementById('booking-price').value = this.currentEditingBooking.price || '';
            document.getElementById('booking-deposit').value = this.currentEditingBooking.deposit || '';
            document.getElementById('booking-deposit-paid').checked = this.currentEditingBooking.depositPaid || false;
            document.getElementById('booking-cancellation').value = this.currentEditingBooking.cancellationPolicy || 'free';
            document.getElementById('booking-free-cancel-until').value = this.currentEditingBooking.freeCancelUntil || '';
        } else {
            title.textContent = this.t('bookingTitle');
            deleteBtn.style.display = 'none';
            
            document.getElementById('booking-start').value = '';
            document.getElementById('booking-end').value = '';
            document.getElementById('booking-guest').value = '';
            document.getElementById('booking-phone').value = '';
            document.getElementById('booking-notes').value = '';
            document.getElementById('booking-price').value = '';
            document.getElementById('booking-deposit').value = '';
            document.getElementById('booking-deposit-paid').checked = false;
            document.getElementById('booking-cancellation').value = 'free';
            document.getElementById('booking-free-cancel-until').value = '';
            
            if (this.selectedDates.length === 2) {
                document.getElementById('booking-start').value = this.formatDate(this.selectedDates[0]);
                document.getElementById('booking-end').value = this.formatDate(this.selectedDates[1]);
            }
        }
        
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }

    updateBookingItemsList() {
        const type = document.getElementById('booking-type').value;
        const itemSelect = document.getElementById('booking-item');
        
        itemSelect.innerHTML = '';
        
        if (type === 'property') {
            this.data.properties.forEach(property => {
                const option = document.createElement('option');
                option.value = property.id;
                option.textContent = `${property.name} ${property.important ? '❗' : ''}`;
                if (this.currentEditingBooking && this.currentEditingBooking.itemId === property.id) {
                    option.selected = true;
                }
                itemSelect.appendChild(option);
            });
        } else {
            this.data.golfCarts.forEach(cart => {
                const option = document.createElement('option');
                option.value = cart.id;
                option.textContent = `${cart.name} (${cart.owner}) - ${cart.seats} мест ${cart.important ? '❗' : ''}`;
                if (this.currentEditingBooking && this.currentEditingBooking.itemId === cart.id) {
                    option.selected = true;
                }
                itemSelect.appendChild(option);
            });
        }
    }
    
    saveProperty() {
        const name = document.getElementById('property-name').value.trim();
        const description = document.getElementById('property-description').value.trim();
        const address = document.getElementById('property-address').value.trim();
        const color = document.getElementById('property-color').value;
        const important = document.getElementById('property-important').checked;
        const importantText = document.getElementById('property-important-text').value.trim();

        if (!name) {
            alert('Введите название жилья');
            return;
        }

        if (this.currentEditingProperty) {
            this.currentEditingProperty.name = name;
            this.currentEditingProperty.description = description;
            this.currentEditingProperty.address = address;
            this.currentEditingProperty.color = color;
            this.currentEditingProperty.important = important;
            this.currentEditingProperty.importantText = importantText;
        } else {
            const newProperty = {
                id: Date.now(),
                name,
                description,
                address,
                color,
                important,
                importantText
            };
            this.data.properties.push(newProperty);
        }

        const success = this.saveData();
        if (success) {
            this.refreshAllData();
            this.hideModal('property-modal');
        } else {
            alert('Ошибка при сохранении данных');
        }
    }

    saveGolfCart() {
        const name = document.getElementById('golf-cart-name').value.trim();
        const owner = document.getElementById('golf-cart-owner').value.trim();
        const seats = parseInt(document.getElementById('golf-cart-seats').value) || 2;
        const description = document.getElementById('golf-cart-description').value.trim();
        const color = document.getElementById('golf-cart-color').value;
        const important = document.getElementById('golf-cart-important').checked;
        const importantText = document.getElementById('golf-cart-important-text').value.trim();

        if (!name) {
            alert('Введите название гольф-машины');
            return;
        }

        if (!owner) {
            alert('Введите имя хозяина');
            return;
        }

        if (this.currentEditingGolfCart) {
            this.currentEditingGolfCart.name = name;
            this.currentEditingGolfCart.owner = owner;
            this.currentEditingGolfCart.seats = seats;
            this.currentEditingGolfCart.description = description;
            this.currentEditingGolfCart.color = color;
            this.currentEditingGolfCart.important = important;
            this.currentEditingGolfCart.importantText = importantText;
        } else {
            const newCart = {
                id: Date.now(),
                name,
                owner,
                seats,
                description,
                color,
                important,
                importantText
            };
            this.data.golfCarts.push(newCart);
        }

        const success = this.saveData();
        if (success) {
            this.refreshAllData();
            this.hideModal('golf-cart-modal');
        } else {
            alert('Ошибка при сохранении данных');
        }
    }
    
    saveBooking() {
        const itemType = document.getElementById('booking-type').value;
        const itemId = parseInt(document.getElementById('booking-item').value);
        const startDate = document.getElementById('booking-start').value;
        const endDate = document.getElementById('booking-end').value;
        const guestName = document.getElementById('booking-guest').value.trim();
        const phone = document.getElementById('booking-phone').value.trim();
        const notes = document.getElementById('booking-notes').value.trim();
        const price = parseFloat(document.getElementById('booking-price').value) || 0;
        const deposit = parseFloat(document.getElementById('booking-deposit').value) || 0;
        const depositPaid = document.getElementById('booking-deposit-paid').checked;
        const cancellationPolicy = document.getElementById('booking-cancellation').value;
        const freeCancelUntil = document.getElementById('booking-free-cancel-until').value.trim();
        
        if (!itemId) {
            alert('Выберите объект');
            return;
        }
        
        if (!startDate || !endDate) {
            alert('Введите даты начала и окончания');
            return;
        }
        
        if (!guestName) {
            alert('Введите имя гостя');
            return;
        }
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        const hasConflict = this.data.bookings.some(booking => {
            if (this.currentEditingBooking && booking.id === this.currentEditingBooking.id) {
                return false;
            }
            if (booking.itemId !== itemId || booking.itemType !== itemType) return false;
            
            const bookingStart = new Date(booking.startDate);
            const bookingEnd = new Date(booking.endDate);
            const newStart = new Date(startDate);
            const newEnd = new Date(endDate);
            
            bookingStart.setHours(0, 0, 0, 0);
            bookingEnd.setHours(23, 59, 59, 999);
            newStart.setHours(0, 0, 0, 0);
            newEnd.setHours(23, 59, 59, 999);
            
            return newStart <= bookingEnd && newEnd >= bookingStart;
        });
        
        if (hasConflict) {
            alert('Выбранные даты пересекаются с существующим бронированием этого объекта');
            return;
        }
        
        if (this.currentEditingBooking) {
            this.currentEditingBooking.itemType = itemType;
            this.currentEditingBooking.itemId = itemId;
            this.currentEditingBooking.startDate = startDate;
            this.currentEditingBooking.endDate = endDate;
            this.currentEditingBooking.guestName = guestName;
            this.currentEditingBooking.phone = phone;
            this.currentEditingBooking.notes = notes;
            this.currentEditingBooking.price = price;
            this.currentEditingBooking.deposit = deposit;
            this.currentEditingBooking.depositPaid = depositPaid;
            this.currentEditingBooking.cancellationPolicy = cancellationPolicy;
            this.currentEditingBooking.freeCancelUntil = freeCancelUntil;
        } else {
            const newBooking = {
                id: Date.now(),
                itemType,
                itemId,
                startDate,
                endDate,
                guestName,
                phone,
                notes,
                price,
                deposit,
                depositPaid,
                cancellationPolicy,
                freeCancelUntil
            };
            this.data.bookings.push(newBooking);
        }
        
        const success = this.saveData();
        if (success) {
            this.refreshAllData();
            this.hideModal('booking-modal');
        } else {
            alert('Ошибка при сохранении данных');
        }
    }
    
    editProperty(propertyId) {
        this.showPropertyModal(propertyId);
    }

    editGolfCart(cartId) {
        this.showGolfCartModal(cartId);
    }
    
    editBooking(bookingId) {
        this.currentEditingBooking = this.data.bookings.find(b => b.id === bookingId);
        if (this.currentEditingBooking) {
            this.showBookingModal();
        }
    }
    
    deleteProperty(propertyId) {
        const property = this.data.properties.find(p => p.id === propertyId);
        if (!property) return;
        
        if (confirm(this.t('deletePropertyConfirm', property.name))) {
            this.data.properties = this.data.properties.filter(p => p.id !== propertyId);
            this.data.bookings = this.data.bookings.filter(b => !(b.itemId === propertyId && b.itemType === 'property'));
            
            const success = this.saveData();
            if (success) {
                this.refreshAllData();
            } else {
                alert('Ошибка при сохранении данных');
            }
        }
    }

    deleteGolfCart(cartId) {
        const cart = this.data.golfCarts.find(g => g.id === cartId);
        if (!cart) return;
        
        if (confirm(this.t('deleteGolfCartConfirm', cart.name))) {
            this.data.golfCarts = this.data.golfCarts.filter(g => g.id !== cartId);
            this.data.bookings = this.data.bookings.filter(b => !(b.itemId === cartId && b.itemType === 'golf-cart'));
            
            const success = this.saveData();
            if (success) {
                this.refreshAllData();
            } else {
                alert('Ошибка при сохранении данных');
            }
        }
    }
        
    deleteBooking(bookingId) {
        if (confirm(this.t('deleteBookingConfirm'))) {
            this.data.bookings = this.data.bookings.filter(b => b.id !== bookingId);
            
            const success = this.saveData();
            if (success) {
                this.refreshAllData();
            } else {
                alert('Ошибка при сохранении данных');
            }
        }
    }
    
    formatDate(date, format = 'yyyy-MM-dd') {
        if (!date) return '';
        
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        
        if (format === 'dd.MM.yyyy') {
            return `${day}.${month}.${year}`;
        } else if (format === 'dd.MM') {
            return `${day}.${month}`;
        } else if (format === 'dd.MM.yy') {
            return `${day}.${month}.${year.toString().slice(-2)}`;
        }
        
        return `${year}-${month}-${day}`;
    }
    
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rental-manager-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    importData(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.properties && data.golfCarts && data.bookings) {
                    if (confirm('Заменить текущие данные импортированными? Существующие данные будут удалены.')) {
                        this.data = data;
                        const success = this.saveData();
                        if (success) {
                            this.refreshAllData();
                            alert('Данные успешно импортированы!');
                        } else {
                            alert('Ошибка при сохранении данных');
                        }
                    }
                } else {
                    alert('Неверный формат файла');
                }
            } catch (error) {
                alert('Ошибка при чтении файла');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
        
        event.target.value = '';
    }
}

// Создаем глобальную переменную приложения
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new RentalApp();
    window.app = app;
});
