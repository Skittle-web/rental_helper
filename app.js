class RentalApp {
    constructor() {
        this.version = '1.0.0';
        this.data = this.loadData();
        this.selectedDates = [];
        this.currentEditingProperty = null;
        this.currentEditingBooking = null;
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.language = localStorage.getItem('rental_language') || 'ru';
        
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
                
                calendar: '📅 Календарь',
                properties: '🏠 Жилье',
                bookings: '📋 Все брони',
                
                selectDates: 'Выберите даты...',
                checkAvailability: 'Показать свободные',
                clearSelection: 'Очистить',
                availableProperties: '🏠 Свободное жилье:',
                bookedProperties: '🚫 Занятое жилье:',
                selectDatesHint: 'Выберите даты в календаре или в поле выше',
                selectedDates: 'Выбранные даты:',
                nights: 'ночей',
                noAvailable: 'Нет свободных объектов на выбранные даты',
                noBooked: 'Нет занятых объектов на выбранные даты',
                bookThis: 'Забронировать это жилье',
                
                manageProperties: 'Управление жильем',
                addProperty: '+ Добавить жилье',
                propertyName: 'Название:',
                propertyDescription: 'Описание:',
                propertyAddress: 'Адрес:',
                propertyPrice: 'Цена за сутки (₽):',
                propertyColor: 'Цвет в календаре:',
                addPropertyTitle: 'Добавить жилье',
                editPropertyTitle: 'Редактировать жилье',
                propertyBookings: 'Бронирования:',
                noBookings: 'Нет бронирований',
                totalBookings: 'Всего:',
                upcomingBookings: 'Ближайшие бронирования:',
                noProperties: 'Жилье не добавлено',
                addPropertyHint: 'Нажмите "Добавить жилье" чтобы начать',
                
                allBookings: 'Все бронирования',
                addBooking: '+ Новая бронь',
                bookingTitle: 'Новое бронирование',
                editBookingTitle: 'Редактировать бронирование',
                selectProperty: 'Жилье:',
                startDate: 'Дата начала:',
                endDate: 'Дата окончания:',
                guestName: 'Имя гостя:',
                guestPhone: 'Телефон:',
                notes: 'Примечания:',
                bookingPrice: 'Цена (₽):',
                deleteBooking: 'Удалить бронь',
                nightsCount: 'ночей',
                noPhone: 'Телефон не указан',
                noNotes: 'Без примечаний',
                unknownProperty: 'Неизвестное жилье',
                
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
                deleteBookingConfirm: 'Удалить это бронирование?',
                bookedFor: 'Занято:',
                guest: 'Гость:'
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
                
                calendar: '📅 Calendar',
                properties: '🏠 Properties',
                bookings: '📋 All Bookings',
                
                selectDates: 'Select dates...',
                checkAvailability: 'Show available',
                clearSelection: 'Clear',
                availableProperties: '🏠 Available properties:',
                bookedProperties: '🚫 Booked properties:',
                selectDatesHint: 'Select dates in calendar or in field above',
                selectedDates: 'Selected dates:',
                nights: 'nights',
                noAvailable: 'No available properties for selected dates',
                noBooked: 'No booked properties for selected dates',
                bookThis: 'Book this property',
                
                manageProperties: 'Manage Properties',
                addProperty: '+ Add Property',
                propertyName: 'Name:',
                propertyDescription: 'Description:',
                propertyAddress: 'Address:',
                propertyPrice: 'Price per night (₽):',
                propertyColor: 'Calendar color:',
                addPropertyTitle: 'Add Property',
                editPropertyTitle: 'Edit Property',
                propertyBookings: 'Bookings:',
                noBookings: 'No bookings',
                totalBookings: 'Total:',
                upcomingBookings: 'Upcoming bookings:',
                noProperties: 'No properties added',
                addPropertyHint: 'Click "Add Property" to start',
                
                allBookings: 'All Bookings',
                addBooking: '+ New Booking',
                bookingTitle: 'New Booking',
                editBookingTitle: 'Edit Booking',
                selectProperty: 'Property:',
                startDate: 'Start date:',
                endDate: 'End date:',
                guestName: 'Guest name:',
                guestPhone: 'Phone:',
                notes: 'Notes:',
                bookingPrice: 'Price (₽):',
                deleteBooking: 'Delete booking',
                nightsCount: 'nights',
                noPhone: 'Phone not specified',
                noNotes: 'No notes',
                unknownProperty: 'Unknown property',
                
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
                deleteBookingConfirm: 'Delete this booking?',
                bookedFor: 'Booked:',
                guest: 'Guest:'
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
    
    loadData() {
        try {
            const saved = localStorage.getItem('rentalData');
            if (saved) {
                const data = JSON.parse(saved);
                if (!data.properties) data.properties = [];
                if (!data.bookings) data.bookings = [];
                return data;
            }
        } catch (e) {
            console.error('Ошибка загрузки данных:', e);
        }
        
        return {
            properties: [],
            bookings: []
        };
    }
    
    saveData() {
        try {
            localStorage.setItem('rentalData', JSON.stringify(this.data));
        } catch (e) {
            console.error('Ошибка сохранения данных:', e);
        }
    }
    
    init() {
        document.documentElement.lang = this.language;
        this.initDatePicker();
        this.setupEventListeners();
        this.updateUI();
        this.updateLanguageButtons();
        this.renderCalendar();
        this.loadPropertiesList();
        this.loadAllBookings();
        this.updateSelectedDatesInfo();
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
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

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

        document.getElementById('add-property')?.addEventListener('click', () => {
            this.showPropertyModal();
        });

        document.getElementById('add-booking')?.addEventListener('click', () => {
            this.showBookingModal();
        });

        document.getElementById('cancel-property')?.addEventListener('click', () => {
            this.hideModal('property-modal');
        });

        document.getElementById('cancel-booking')?.addEventListener('click', () => {
            this.hideModal('booking-modal');
        });

        document.getElementById('save-property')?.addEventListener('click', () => {
            this.saveProperty();
        });

        document.getElementById('save-booking')?.addEventListener('click', () => {
            this.saveBooking();
        });

        // ИСПРАВЛЕННАЯ КНОПКА УДАЛЕНИЯ В МОДАЛЬНОМ ОКНЕ ЖИЛЬЯ
        document.getElementById('delete-property')?.addEventListener('click', () => {
            if (this.currentEditingProperty && confirm(this.t('deletePropertyConfirm', this.currentEditingProperty.name))) {
                // Удаляем жилье из массива
                this.data.properties = this.data.properties.filter(p => p.id !== this.currentEditingProperty.id);
                
                // Удаляем все связанные бронирования
                this.data.bookings = this.data.bookings.filter(b => b.propertyId !== this.currentEditingProperty.id);
                
                this.saveData();
                this.loadPropertiesList();
                this.loadAllBookings();
                this.renderCalendar();
                this.hideModal('property-modal');
                
                alert(this.t('delete') + '!');
            }
        });

        // ИСПРАВЛЕННАЯ КНОПКА УДАЛЕНИЯ В МОДАЛЬНОМ ОКНЕ БРОНИРОВАНИЯ
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
                alert(this.t('delete') + '!');
            }
        });

        document.getElementById('modal-overlay')?.addEventListener('click', () => {
            this.hideModal('property-modal');
            this.hideModal('booking-modal');
        });

        document.getElementById('lang-ru')?.addEventListener('click', () => {
            this.switchLanguage('ru');
        });
        
        document.getElementById('lang-en')?.addEventListener('click', () => {
            this.switchLanguage('en');
        });
        
        // ДЕЛЕГИРОВАНИЕ СОБЫТИЙ ДЛЯ ДИНАМИЧЕСКИ СОЗДАННЫХ КНОПОК
        document.addEventListener('click', (e) => {
            // Обработка кликов по карточкам жилья
            if (e.target.closest('.property-card')) {
                const card = e.target.closest('.property-card');
                const propertyId = parseInt(card.dataset.id);
                
                if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
                    if (propertyId) {
                        this.deleteProperty(propertyId);
                    }
                } else if (e.target.classList.contains('edit-btn') || e.target.closest('.edit-btn')) {
                    if (propertyId) {
                        this.editProperty(propertyId);
                    }
                } else if (e.target.classList.contains('view-btn') || e.target.closest('.view-btn')) {
                    if (propertyId) {
                        this.viewPropertyBookings(propertyId);
                    }
                }
            }
            
            // Обработка кликов по карточкам бронирований
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
    }
    
    switchLanguage(lang) {
        this.language = lang;
        localStorage.setItem('rental_language', lang);
        
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
        document.querySelectorAll('.tab-btn').forEach((btn, index) => {
            const tab = btn.dataset.tab;
            if (tab === 'calendar') btn.innerHTML = ` ${this.t('calendar')}`;
            if (tab === 'properties') btn.innerHTML = ` ${this.t('properties')}`;
            if (tab === 'bookings') btn.innerHTML = ` ${this.t('bookings')}`;
        });
        
        const checkBtn = document.getElementById('check-availability');
        const clearBtn = document.getElementById('clear-selection');
        if (checkBtn) checkBtn.textContent = this.t('checkAvailability');
        if (clearBtn) clearBtn.textContent = this.t('clearSelection');
        
        const availableTitle = document.getElementById('available-title');
        if (availableTitle) availableTitle.textContent = this.t('availableProperties');
        
        const manageTitle = document.getElementById('manage-properties-title');
        if (manageTitle) manageTitle.textContent = this.t('manageProperties');
        
        const bookingsTitle = document.getElementById('all-bookings-title');
        if (bookingsTitle) bookingsTitle.textContent = this.t('allBookings');
        
        const dateRange = document.getElementById('date-range');
        if (dateRange) dateRange.placeholder = this.t('selectDates');
        
        const addPropertyBtn = document.getElementById('add-property');
        if (addPropertyBtn) addPropertyBtn.textContent = this.t('addProperty');
        
        const addBookingBtn = document.getElementById('add-booking');
        if (addBookingBtn) addBookingBtn.textContent = this.t('addBooking');
        
        this.updateSelectedDatesInfo();
        this.renderCalendar();
        this.loadPropertiesList();
        this.loadAllBookings();
        this.updateModals();
    }
    
    updateModals() {
        const propertyModal = document.getElementById('property-modal');
        const bookingModal = document.getElementById('booking-modal');
        
        if (propertyModal && propertyModal.style.display === 'block') {
            const title = document.getElementById('modal-title');
            if (title) {
                title.textContent = this.currentEditingProperty ? 
                    this.t('editPropertyTitle') : this.t('addPropertyTitle');
            }
            
            const labels = propertyModal.querySelectorAll('label');
            if (labels[0]) labels[0].textContent = this.t('propertyName');
            if (labels[1]) labels[1].textContent = this.t('propertyDescription');
            if (labels[2]) labels[2].textContent = this.t('propertyAddress');
            if (labels[3]) labels[3].textContent = this.t('propertyPrice');
            if (labels[4]) labels[4].textContent = this.t('propertyColor');
            
            const saveBtn = document.getElementById('save-property');
            const cancelBtn = document.getElementById('cancel-property');
            const deleteBtn = document.getElementById('delete-property');
            if (saveBtn) saveBtn.textContent = this.t('save');
            if (cancelBtn) cancelBtn.textContent = this.t('cancel');
            if (deleteBtn) deleteBtn.textContent = this.t('delete');
        }
        
        if (bookingModal && bookingModal.style.display === 'block') {
            const title = document.getElementById('booking-modal-title');
            if (title) {
                title.textContent = this.currentEditingBooking ? 
                    this.t('editBookingTitle') : this.t('bookingTitle');
            }
            
            const labels = bookingModal.querySelectorAll('label');
            if (labels[0]) labels[0].textContent = this.t('selectProperty');
            if (labels[1]) labels[1].textContent = this.t('startDate');
            if (labels[2]) labels[2].textContent = this.t('endDate');
            if (labels[3]) labels[3].textContent = this.t('guestName');
            if (labels[4]) labels[4].textContent = this.t('guestPhone');
            if (labels[5]) labels[5].textContent = this.t('notes');
            if (labels[6]) labels[6].textContent = this.t('bookingPrice');
            
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
        const bookedContainer = document.getElementById('booked-properties-container');
        
        if (availableContainer) {
            availableContainer.innerHTML = '';
        }
        
        if (bookedContainer) {
            bookedContainer.innerHTML = '';
        }
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
            
            if (tabName === 'properties') {
                this.loadPropertiesList();
            } else if (tabName === 'bookings') {
                this.loadAllBookings();
            }
        }
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
                        ${dayBookings.map(booking => `
                            <div class="booking-dot" style="background: ${this.getPropertyColor(booking.propertyId)}" 
                                 title="${this.getPropertyName(booking.propertyId)}"></div>
                        `).join('')}
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
    
    isDateBooked(date) {
        const dateStr = this.formatDate(date);
        return this.data.bookings.some(booking => {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);
            const check = new Date(dateStr);
            return check >= start && check <= end;
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
    
    getPropertyColor(propertyId) {
        const property = this.data.properties.find(p => p.id === propertyId);
        return property ? (property.color || '#3498db') : '#3498db';
    }
    
    getPropertyName(propertyId) {
        const property = this.data.properties.find(p => p.id === propertyId);
        return property ? property.name : this.t('unknownProperty');
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
    
    checkAvailability() {
        if (this.selectedDates.length !== 2) {
            alert(this.t('selectDates'));
            return;
        }
        
        const [startDate, endDate] = this.selectedDates;
        const bookedProperties = new Set();
        const bookedPropertiesDetails = [];
        
        this.data.bookings.forEach(booking => {
            const bookingStart = new Date(booking.startDate);
            const bookingEnd = new Date(booking.endDate);
            
            if (!(bookingEnd < startDate || bookingStart > endDate)) {
                bookedProperties.add(booking.propertyId);
                
                const property = this.data.properties.find(p => p.id === booking.propertyId);
                if (property) {
                    bookedPropertiesDetails.push({
                        property,
                        booking
                    });
                }
            }
        });

        const available = this.data.properties.filter(
            property => !bookedProperties.has(property.id)
        );
        
        this.renderAvailableProperties(available);
        this.renderBookedProperties(bookedPropertiesDetails);
    }
    
    renderAvailableProperties(properties) {
        const container = document.getElementById('available-properties');
        if (!container) return;
        
        if (properties.length === 0) {
            container.innerHTML = `
                <div class="no-results" style="padding: 20px; text-align: center; color: #666;">
                    <p>😕 ${this.t('noAvailable')}</p>
                </div>
            `;
            return;
        }

        const nights = Math.ceil((this.selectedDates[1] - this.selectedDates[0]) / (1000 * 60 * 60 * 24)) + 1;
        const nightText = this.language === 'ru' ? 'сут' : 'night';
        
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                ${properties.map(property => {
                    const totalPrice = property.price * nights;
                    
                    return `
                        <div class="property-card" style="border-left-color: ${property.color || '#3498db'}">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div>
                                    <h4 style="margin: 0;">${property.name}</h4>
                                    <div class="property-price">${property.price} ₽/${nightText} × ${nights} ${this.t('nights')} = ${totalPrice} ₽</div>
                                </div>
                                <div style="width: 15px; height: 15px; border-radius: 50%; background: ${property.color || '#3498db'}"></div>
                            </div>
                            <p style="margin: 8px 0; color: #666; font-size: 14px;">${property.description}</p>
                            <p class="property-address">📍 ${property.address}</p>
                            <div class="property-actions" style="margin-top: 15px;">
                                <button class="primary-btn" onclick="app.bookProperty(${property.id})" style="width: 100%;">
                                    ${this.t('bookNow')}
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    renderBookedProperties(bookedProperties) {
        const container = document.getElementById('booked-properties-container');
        if (!container) return;
        
        if (bookedProperties.length === 0) {
            container.innerHTML = `
                <h4 style="margin: 25px 0 15px 0; color: #e74c3c;">${this.t('bookedProperties')}</h4>
                <div style="padding: 15px; text-align: center; color: #666; background: #f8f9fa; border-radius: 8px;">
                    <p>📭 ${this.t('noBooked')}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <h4 style="margin: 25px 0 15px 0; color: #e74c3c;">${this.t('bookedProperties')}</h4>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                ${bookedProperties.map(item => {
                    const { property, booking } = item;
                    const bookingStart = new Date(booking.startDate);
                    const bookingEnd = new Date(booking.endDate);
                    const totalBookingNights = Math.ceil((bookingEnd - bookingStart) / (1000 * 60 * 60 * 24)) + 1;
                    
                    return `
                        <div class="booked-property-item">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                                <strong style="color: #c53030;">${property.name}</strong>
                                <div style="width: 12px; height: 12px; border-radius: 50%; background: ${property.color || '#e74c3c'}"></div>
                            </div>
                            
                            <div style="font-size: 12px; color: #666; margin-bottom: 5px;">
                                📍 ${property.address}
                            </div>
                            
                            <div style="font-size: 11px; color: #e53e3e; background: #fed7d7; padding: 4px 8px; border-radius: 4px; margin: 8px 0;">
                                <strong>${this.t('bookedFor')}</strong> ${this.formatDate(bookingStart, 'dd.MM.yy')} - ${this.formatDate(bookingEnd, 'dd.MM.yy')}
                                (${totalBookingNights} ${this.t('nights')})
                            </div>
                            
                            <div style="font-size: 12px; margin-top: 8px;">
                                <div><strong>${this.t('guest')}</strong> ${booking.guestName}</div>
                                ${booking.phone ? `<div>📞 ${booking.phone}</div>` : ''}
                                ${booking.notes ? `<div style="margin-top: 4px; font-style: italic;">${booking.notes}</div>` : ''}
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
                }).join('')}
            </div>
        `;
    }
    
    loadPropertiesList() {
        const container = document.getElementById('properties-list');
        if (!container) return;
        
        if (this.data.properties.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <p>🏠 ${this.t('noProperties')}</p>
                    <p>${this.t('addPropertyHint')}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.data.properties.map(property => {
            const propertyBookings = this.data.bookings.filter(b => b.propertyId === property.id);
            
            const nightText = this.language === 'ru' ? 'сут' : 'night';
            
            return `
                <div class="property-card" data-id="${property.id}" style="border-left-color: ${property.color || '#3498db'}">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <h3>${property.name}</h3>
                            <div class="property-price">${property.price} ₽/${nightText}</div>
                        </div>
                        <div style="width: 20px; height: 20px; border-radius: 50%; background: ${property.color || '#3498db'}"></div>
                    </div>
                    <p>${property.description}</p>
                    <p class="property-address">📍 ${property.address}</p>
                    
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
    
    loadAllBookings() {
        const container = document.getElementById('all-bookings');
        if (!container) return;
        
        const sortedBookings = [...this.data.bookings].sort((a, b) => 
            new Date(a.startDate) - new Date(b.startDate)
        );
        
        if (sortedBookings.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <p>📅 ${this.t('noBookings')}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = sortedBookings.map(booking => {
            const property = this.data.properties.find(p => p.id === booking.propertyId);
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);
            const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            
            return `
                <div class="booking-card" data-booking-id="${booking.id}">
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${property?.color || '#3498db'}"></div>
                            <strong>${property?.name || this.t('unknownProperty')}</strong>
                        </div>
                        <div class="booking-dates">
                            📅 ${this.formatDate(startDate, 'dd.MM.yyyy')} - ${this.formatDate(endDate, 'dd.MM.yyyy')} (${nights} ${this.t('nights')})
                        </div>
                        <div class="booking-guest">👤 ${booking.guestName}</div>
                        <div style="color: #666; margin-top: 5px;">${booking.phone || this.t('noPhone')}</div>
                        <div style="color: #666; margin-top: 5px;">${booking.notes || this.t('noNotes')}</div>
                        <div style="color: #27ae60; font-weight: bold; margin-top: 10px;">${booking.price} ₽</div>
                    </div>
                    <div class="booking-actions">
                        <button class="edit-btn">${this.t('edit')}</button>
                        <button class="delete-btn">${this.t('delete')}</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    bookProperty(propertyId) {
        this.currentEditingBooking = null;
        this.showBookingModal(propertyId);
    }
    
    viewPropertyBookings(propertyId) {
        const property = this.data.properties.find(p => p.id === propertyId);
        if (!property) return;
        
        const bookings = this.data.bookings
            .filter(b => b.propertyId === propertyId)
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        
        // Создаем уникальный ID для модалки
        const modalId = 'bookings-modal-' + Date.now();
        
        let bookingsHTML = `
            <div style="max-width: 600px; padding: 20px; background: white; border-radius: 10px; max-height: 80vh; overflow-y: auto;">
                <h3 style="margin-bottom: 20px;">${this.t('propertyBookings')}: ${property.name}</h3>
        `;
        
        if (bookings.length === 0) {
            bookingsHTML += `<p style="color: #666; text-align: center; padding: 20px;">${this.t('noBookings')}</p>`;
        } else {
            bookingsHTML += bookings.map(booking => {
                const startDate = new Date(booking.startDate);
                const endDate = new Date(booking.endDate);
                const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                
                return `
                    <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin-bottom: 10px; border-left: 4px solid ${property.color || '#3498db'}">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <div style="color: #e74c3c; font-weight: bold; font-size: 14px;">
                                    📅 ${this.formatDate(startDate, 'dd.MM.yyyy')} - ${this.formatDate(endDate, 'dd.MM.yyyy')} (${nights} ${this.t('nights')})
                                </div>
                                <div style="font-weight: 600; margin: 5px 0;">👤 ${booking.guestName}</div>
                                <div style="color: #666; margin-top: 5px;">📞 ${booking.phone || this.t('noPhone')}</div>
                                <div style="color: #666; margin-top: 5px;">${booking.notes || this.t('noNotes')}</div>
                                <div style="color: #27ae60; font-weight: bold; margin-top: 10px;">${booking.price} ₽</div>
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
            <div style="margin-top: 20px; display: flex; justify-content: center;">
                <button onclick="document.getElementById('${modalId}').remove(); document.getElementById('modal-overlay').style.display = 'none';" 
                        style="padding: 10px 30px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    ${this.t('close')}
                </button>
            </div>
        </div>`;
        
        // Показываем модалку
        const modalOverlay = document.getElementById('modal-overlay');
        const modalContainer = document.createElement('div');
        modalContainer.id = modalId;
        modalContainer.className = 'modal';
        modalContainer.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1001;';
        modalContainer.innerHTML = bookingsHTML;
        
        modalOverlay.style.display = 'block';
        document.body.appendChild(modalContainer);
        
        // Клик на overlay закрывает модалку
        modalOverlay.onclick = () => {
            document.getElementById(modalId).remove();
            modalOverlay.style.display = 'none';
        };
    }
    
    showCustomModal(content) {
        const modalOverlay = document.getElementById('modal-overlay');
        const existingModal = document.querySelector('.custom-modal');
        
        // Удаляем старую модалку если есть
        if (existingModal) {
            existingModal.remove();
        }
        
        // Создаем новую модалку
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal custom-modal';
        modalContainer.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1001;';
        modalContainer.innerHTML = content;
        
        // Показываем
        modalOverlay.style.display = 'block';
        document.body.appendChild(modalContainer);
        
        // Добавляем обработчик клика на overlay
        const closeHandler = () => {
            this.hideCustomModal();
        };
        
        modalOverlay.onclick = closeHandler;
        
        // Добавляем обработчик ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.hideCustomModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        // Сохраняем ссылки для удаления
        modalContainer._closeHandler = closeHandler;
        modalContainer._escHandler = escHandler;
    }

    hideCustomModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        const modal = document.querySelector('.custom-modal');
        
        if (modal) {
            // Удаляем обработчики
            if (modal._closeHandler) {
                modalOverlay.onclick = null;
            }
            
            // Удаляем модалку
            modal.remove();
        }
        
        // Скрываем overlay
        modalOverlay.style.display = 'none';
    }
    
    hideModal(modalId = null) {
        if (modalId) {
            document.getElementById(modalId).style.display = 'none';
        } else {
            document.getElementById('property-modal').style.display = 'none';
            document.getElementById('booking-modal').style.display = 'none';
        }
        
        // Не скрываем overlay если есть кастомная модалка
        const customModal = document.querySelector('.custom-modal');
        if (!customModal) {
            document.getElementById('modal-overlay').style.display = 'none';
        }
        
        this.currentEditingProperty = null;
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
            
            document.getElementById('property-name').value = this.currentEditingProperty.name;
            document.getElementById('property-description').value = this.currentEditingProperty.description || '';
            document.getElementById('property-address').value = this.currentEditingProperty.address || '';
            document.getElementById('property-price').value = this.currentEditingProperty.price || '';
            document.getElementById('property-color').value = this.currentEditingProperty.color || '#3498db';
        } else {
            this.currentEditingProperty = null;
            title.textContent = this.t('addPropertyTitle');
            deleteBtn.style.display = 'none';
            
            document.getElementById('property-name').value = '';
            document.getElementById('property-description').value = '';
            document.getElementById('property-address').value = '';
            document.getElementById('property-price').value = '';
            document.getElementById('property-color').value = '#3498db';
        }
        
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }
    
    showBookingModal(propertyId = null) {
        const modal = document.getElementById('booking-modal');
        const overlay = document.getElementById('modal-overlay');
        const title = document.getElementById('booking-modal-title');
        const propertySelect = document.getElementById('booking-property');
        const deleteBtn = document.getElementById('delete-booking');
        
        propertySelect.innerHTML = this.data.properties.map(property => 
            `<option value="${property.id}" ${propertyId == property.id ? 'selected' : ''}>${property.name}</option>`
        ).join('');
        
        if (this.currentEditingBooking) {
            title.textContent = this.t('editBookingTitle');
            deleteBtn.style.display = 'block';
            
            document.getElementById('booking-property').value = this.currentEditingBooking.propertyId;
            document.getElementById('booking-start').value = this.currentEditingBooking.startDate;
            document.getElementById('booking-end').value = this.currentEditingBooking.endDate;
            document.getElementById('booking-guest').value = this.currentEditingBooking.guestName || '';
            document.getElementById('booking-phone').value = this.currentEditingBooking.phone || '';
            document.getElementById('booking-notes').value = this.currentEditingBooking.notes || '';
            document.getElementById('booking-price').value = this.currentEditingBooking.price || '';
        } else {
            title.textContent = this.t('bookingTitle');
            deleteBtn.style.display = 'none';
            
            document.getElementById('booking-start').value = '';
            document.getElementById('booking-end').value = '';
            document.getElementById('booking-guest').value = '';
            document.getElementById('booking-phone').value = '';
            document.getElementById('booking-notes').value = '';
            document.getElementById('booking-price').value = '';
            
            if (this.selectedDates.length === 2) {
                document.getElementById('booking-start').value = this.formatDate(this.selectedDates[0]);
                document.getElementById('booking-end').value = this.formatDate(this.selectedDates[1]);
                
                const selectedProperty = this.data.properties.find(p => p.id == (propertyId || propertySelect.value));
                if (selectedProperty && selectedProperty.price) {
                    const nights = Math.ceil((this.selectedDates[1] - this.selectedDates[0]) / (1000 * 60 * 60 * 24)) + 1;
                    document.getElementById('booking-price').value = selectedProperty.price * nights;
                }
            }
        }
        
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }
    
    saveProperty() {
        const name = document.getElementById('property-name').value.trim();
        const description = document.getElementById('property-description').value.trim();
        const address = document.getElementById('property-address').value.trim();
        const price = parseFloat(document.getElementById('property-price').value) || 0;
        const color = document.getElementById('property-color').value;
        
        if (!name) {
            alert(this.t('propertyName'));
            return;
        }
        
        if (this.currentEditingProperty) {
            this.currentEditingProperty.name = name;
            this.currentEditingProperty.description = description;
            this.currentEditingProperty.address = address;
            this.currentEditingProperty.price = price;
            this.currentEditingProperty.color = color;
        } else {
            const newProperty = {
                id: Date.now(),
                name,
                description,
                address,
                price,
                color
            };
            this.data.properties.push(newProperty);
        }
        
        this.saveData();
        this.loadPropertiesList();
        this.renderCalendar();
        this.hideModal();
        
        alert(this.t('save') + '!');
    }
    
    saveBooking() {
        const propertyId = parseInt(document.getElementById('booking-property').value);
        const startDate = document.getElementById('booking-start').value;
        const endDate = document.getElementById('booking-end').value;
        const guestName = document.getElementById('booking-guest').value.trim();
        const phone = document.getElementById('booking-phone').value.trim();
        const notes = document.getElementById('booking-notes').value.trim();
        const price = parseFloat(document.getElementById('booking-price').value) || 0;
        
        if (!propertyId) {
            alert(this.t('selectProperty'));
            return;
        }
        
        if (!startDate || !endDate) {
            alert(this.t('selectDates'));
            return;
        }
        
        if (!guestName) {
            alert(this.t('guestName'));
            return;
        }
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        const hasConflict = this.data.bookings.some(booking => {
            if (this.currentEditingBooking && booking.id === this.currentEditingBooking.id) {
                return false;
            }
            if (booking.propertyId !== propertyId) return false;
            
            const bookingStart = new Date(booking.startDate);
            const bookingEnd = new Date(booking.endDate);
            
            return !(end < bookingStart || start > bookingEnd);
        });
        
        if (hasConflict) {
            alert('Выбранные даты пересекаются с существующим бронированием этого жилья');
            return;
        }
        
        if (this.currentEditingBooking) {
            this.currentEditingBooking.propertyId = propertyId;
            this.currentEditingBooking.startDate = startDate;
            this.currentEditingBooking.endDate = endDate;
            this.currentEditingBooking.guestName = guestName;
            this.currentEditingBooking.phone = phone;
            this.currentEditingBooking.notes = notes;
            this.currentEditingBooking.price = price;
        } else {
            const newBooking = {
                id: Date.now(),
                propertyId,
                startDate,
                endDate,
                guestName,
                phone,
                notes,
                price
            };
            this.data.bookings.push(newBooking);
        }
        
        this.saveData();
        this.loadAllBookings();
        this.renderCalendar();
        
        if (document.getElementById('calendar-tab').classList.contains('active')) {
            this.checkAvailability();
        }
        
        this.hideModal();
        alert(this.t('save') + '!');
    }
    
    editProperty(propertyId) {
        this.showPropertyModal(propertyId);
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
            // Удаляем жилье из массива
            this.data.properties = this.data.properties.filter(p => p.id !== propertyId);
            
            // Удаляем все связанные бронирования
            this.data.bookings = this.data.bookings.filter(b => b.propertyId !== propertyId);
            
            this.saveData();
            this.loadPropertiesList();
            this.loadAllBookings();
            this.renderCalendar();
            
            alert(this.t('delete') + '!');
        }
    }
    
    deleteBooking(bookingId) {
        if (confirm(this.t('deleteBookingConfirm'))) {
            this.data.bookings = this.data.bookings.filter(b => b.id !== bookingId);
            this.saveData();
            this.loadAllBookings();
            this.renderCalendar();
            
            if (document.getElementById('calendar-tab').classList.contains('active')) {
                this.checkAvailability();
            }
            
            alert(this.t('delete') + '!');
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
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new RentalApp();
});