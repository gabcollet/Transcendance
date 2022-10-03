# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: gcollet <gcollet@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/10/03 13:51:00 by gcollet           #+#    #+#              #
#    Updated: 2022/10/03 15:14:08 by gcollet          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

all: up

up:
		docker-compose -f docker-compose.yml up --build

down:
		docker-compose -f docker-compose.yml down
		
clean:
		docker-compose -f docker-compose.yml down --rmi all

fclean:
		

.PHONY: all up down clean fclean